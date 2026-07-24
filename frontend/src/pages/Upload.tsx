import { useEffect, useRef, useState } from "react";
import ATSScoreCard from "../components/ATSScoreCard";
import SummaryCard from "../components/SummaryCard";
import SkillsCard from "../components/SkillsCard";
import MissingSkillsCard from "../components/MissingSkillsCard";
import StrengthsCard from "../components/StrengthsCard";
import WeaknessesCard from "../components/WeaknessesCard";
import SuggestionsCard from "../components/SuggestionsCard";
import ResumePreview from "../components/ResumePreview";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

function Upload() {
  const [fileName, setFileName] = useState("No file selected");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);
  const [rewrittenResume, setRewrittenResume] = useState("");
  const [rewriting, setRewriting] = useState(false);


  const uploadResume = async () => {
    if (!selectedFile) return;
console.log("Job Description:", jobDescription);
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", selectedFile);
formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("https://resume-ai-backend-vtbx.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

setAnalysis(data.analysis);

toast.success("Resume analyzed successfully!");

    } catch (error) {
toast.error("Something went wrong!");
      console.error(error);
    }

    setLoading(false);
  };

  const rewriteResume = async () => {
    console.log("Rewrite button clicked");
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("resume", selectedFile);

  if (jobDescription) {
    formData.append("jobDescription", jobDescription);
  }

  try {
    setRewriting(true);
    const response = await fetch("https://resume-ai-backend-vtbx.onrender.com/rewrite", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
setRewrittenResume(data.rewrittenResume);} else {
  toast.error(data.message || "Failed to rewrite resume.");
}
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  } finally {
  setRewriting(false);
}
};

const downloadRewrittenResume = () => {
  if (!rewrittenResume) return;

  const blob = new Blob([rewrittenResume], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "AI_Rewritten_Resume.txt";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

<button
  onClick={downloadRewrittenResume}
  className="mb-4 ml-3 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
>
  📥 Download
</button>

const downloadReport = async () => {
    if (!analysis) return;
 

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});
  doc.setTextColor(37, 99, 235); // Blue
doc.setFontSize(22);
doc.setFont("helvetica", "bold");
doc.text("AI Resume Analysis Report", 20, 20);

doc.setTextColor(0, 0, 0); // Reset to black
doc.setFont("helvetica", "normal");

  doc.setFontSize(14);

  doc.text(`ATS Score: ${analysis.atsScore}/100`, 20, 40);
doc.text(`Job Match Score: ${analysis.matchScore}/100`, 20, 50);
  doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Summary", 20, 65);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const summary = doc.splitTextToSize(
  String(analysis.summary || ""),
  170
);

doc.text(summary, 20, 75);

  doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Skills", 20, 105);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const skills = doc.splitTextToSize(
  (analysis.skills || []).join(", "),
  170
);

doc.text(skills, 20, 115);


 doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Missing Skills", 20, 145);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const missingSkills = doc.splitTextToSize(
  (analysis.missingSkills || []).join(", "),
  170
);

doc.text(missingSkills, 20, 155);

doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Strengths", 20, 180);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const strengths = doc.splitTextToSize(
  (analysis.strengths || []).join(", "),
  170
);

doc.text(strengths, 20, 190);
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("Weaknesses", 20, 220);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const weaknesses = doc.splitTextToSize(
  (analysis.weaknesses || []).join(", "),
  170
);

doc.text(weaknesses, 20, 230);
doc.addPage();
doc.setFont("helvetica", "bold");
doc.setFontSize(16);
doc.text("AI Suggestions", 20, 20);

doc.setFont("helvetica", "normal");
doc.setFontSize(12);

const suggestions = doc.splitTextToSize(
  (analysis.suggestions || []).join(", "),
  170
);

doc.text(suggestions, 20, 30);

  doc.save("Resume-Analysis.pdf");
};

  useEffect(() => {
    if (!analysis?.atsScore) return;

    let current = 0;

    const interval = setInterval(() => {
      current++;

      if (current >= analysis.atsScore) {
        current = analysis.atsScore;
        clearInterval(interval);
      }

      setAnimatedScore(current);
    }, 20);

    return () => clearInterval(interval);
  }, [analysis]);

  const scoreColor =
    analysis?.atsScore >= 80
      ? "#22c55e"
      : analysis?.atsScore >= 50
      ? "#facc15"
      : "#ef4444";

  const scoreLabel =
    analysis?.atsScore >= 80
      ? "🌟 Excellent Resume"
      : analysis?.atsScore >= 60
      ? "👍 Good Resume"
      : analysis?.atsScore >= 40
      ? "⚠️ Average Resume"
      : "❌ Needs Improvement";
  return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-10 text-white">
    <div className="mx-auto max-w-4xl rounded-2xl bg-slate-800 p-10 shadow-xl">
       <h1 className="mb-3 text-center text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
  AI Resume Analyzer
</h1>

<p className="mb-8 text-center text-slate-300">
  Upload your resume and get an AI-powered ATS analysis in seconds.
</p>

        <input
          type="file"
          id="resume"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setSelectedFile(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }
          }}
        />

        <label
          htmlFor="resume"
className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30"
        >
          Choose Resume
        </label>

        <p className="mt-5">{fileName}</p>
<div className="mt-6">
  <label className="mb-2 block text-lg font-semibold">
    Job Description
  </label>

  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste the job description here..."
    rows={8}
    className="w-full rounded-lg border border-slate-600 bg-slate-700 p-4 text-white outline-none focus:border-blue-500"
  />
</div>
        <button
  onClick={uploadResume}
  disabled={!selectedFile || loading}
className="mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50">
  {loading ? (
    <div className="flex items-center justify-center gap-3">
      <ClipLoader color="#ffffff" size={20} />
      <span>Analyzing...</span>
    </div>
  ) : (
    "Analyze Resume"
  )}
</button>


      {analysis && (
  <div className="mt-6 flex gap-4">
    <button
      onClick={downloadReport}
className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30"    >
      Download Report
    </button>

<button
  onClick={rewriteResume}
  disabled={rewriting}
  className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-60"
>
  {rewriting ? "✨ Rewriting..." : "✨ Rewrite Resume"}
</button>

    <button
      onClick={() => {
        setAnalysis(null);
        setSelectedFile(null);
        setFileName("No file selected");
        setAnimatedScore(0);
      }}
      className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30"
    >
      Choose Another Resume
    </button>
  </div>
)}

        {analysis && (
  <div
    ref={reportRef}
    className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3"
  >
    <div className="lg:col-span-1">
  <ResumePreview file={selectedFile} />
</div>

<div className="space-y-6 lg:col-span-2">

            <ATSScoreCard
  animatedScore={animatedScore}
  scoreColor={scoreColor}
  scoreLabel={scoreLabel}
  matchScore={analysis.matchScore || 0}

/>

       <SummaryCard summary={analysis.summary} />

            <div className="grid gap-6 md:grid-cols-2">
             <SkillsCard skills={analysis.skills || []} />

              <MissingSkillsCard
  missingSkills={analysis.missingSkills || []}
/>
            </div>

            <StrengthsCard strengths={analysis.strengths || []} />

            <WeaknessesCard weaknesses={analysis.weaknesses || []} />

           <SuggestionsCard suggestions={analysis.suggestions || []} />
          </div>
          </div>
        )}

        {rewrittenResume && (
  <div className="mt-8 rounded-3xl border border-purple-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
    <h2 className="mb-4 text-2xl font-bold">
      ✨ AI Rewritten Resume
    </h2>

    <button
  onClick={() => {
    navigator.clipboard.writeText(rewrittenResume);
    toast.success("Copied to clipboard!");
  }}
  className="mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
>
  📋 Copy
</button>

   <div className="max-h-[500px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900/60 p-5">
  <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
    {rewrittenResume}
  </pre>
</div>
  </div>
)}
      </div>
    </div>
  );
}

export default Upload;