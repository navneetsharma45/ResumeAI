const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("ResumeAI Backend is Running 🚀");
});

app.post("/upload", (req, res) => {
  console.log("Upload request received");

  res.json({
    success: true,
    message: "Resume received successfully!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});