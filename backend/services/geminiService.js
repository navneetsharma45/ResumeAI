import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeResume(resumeText, jobDescription) {
  const prompt = `
You are an expert ATS Resume Analyzer.

Compare the candidate's resume with the job description.

Return ONLY valid JSON in this exact format.

{
  "atsScore": 0,
  "matchScore": 0,
  "summary": "",
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text;
}

export async function rewriteResume(resumeText, jobDescription) {
  const prompt = `
You are a professional resume writer.

Rewrite the following resume to be:
- ATS-friendly
- Professional
- Clear
- Keyword optimized
- Keep all facts truthful.
- If a job description is provided, tailor the resume toward that role.

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}

Return ONLY the rewritten resume in clean Markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text;
}