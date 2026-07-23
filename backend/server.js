import {
  analyzeResume,
  rewriteResume,
} from "./services/geminiService.js";
import { extractText } from "./services/pdfService.js";
import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"));
    }
  },
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/upload", async (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    console.log("req.body =", req.body);
console.log("req.file =", req.file?.originalname);
    
    
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

const text = await extractText(req.file.path);

const jobDescription = req.body.jobDescription;

console.log("========== PDF TEXT ==========");
console.log(text);
console.log("========== END PDF TEXT ==========");

console.log("========== JOB DESCRIPTION ==========");
console.log(jobDescription);
console.log("====================================");

const analysisText = await analyzeResume(text, jobDescription);
console.log("========== AI RESPONSE ==========");
console.log(analysisText);
console.log("=================================");
let analysis;

try {
  analysis = JSON.parse(
    analysisText.replace(/```json/g, "").replace(/```/g, "").trim()
  );
} catch (err) {
  analysis = {
    error: "AI returned an invalid response.",
    raw: analysisText,
  };
}
res.json({
  success: true,
  analysis,
});
  });
});
app.post("/rewrite", (req, res) => {
  upload.single("resume")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const resumeText = await extractText(req.file.path);
      const jobDescription = req.body.jobDescription || "";

      const rewrittenResume = await rewriteResume(
        resumeText,
        jobDescription
      );

      res.json({
        success: true,
        rewrittenResume,
      });
    } 
    catch (error) {
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message || "Failed to rewrite resume.",
  });
}
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});