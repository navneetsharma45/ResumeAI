import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
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

  const response = await groq.chat.completions.create({
   model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
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
- Tailor it to the job description if provided.

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}

Return ONLY the rewritten resume in Markdown.
`;

  const response = await groq.chat.completions.create({
   model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0].message.content;
}