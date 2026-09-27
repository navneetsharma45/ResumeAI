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

Rewrite the resume below into a clean, professional ATS-friendly resume.

Rules:
- Keep all facts truthful.
- Do not invent companies, jobs, dates, skills, projects, education, or achievements.
- Improve grammar and wording.
- Tailor the resume to the job description if provided.
- Use normal spacing between words.
- NEVER put spaces between individual letters.
- Do NOT use Markdown.
- Do NOT use tables.
- Do NOT use **bold**, # headings, bullet symbols, pipes, or Markdown links.
- Use simple plain text sections.
- Keep the candidate's name on the first line.
- Put contact information on separate lines.
- Use these section names when applicable:
  Professional Summary
  Technical Skills
  Professional Experience
  Projects
  Education
  Certifications

Example format:

Navneet Sharma

Email: navneet@example.com
Phone: +91 9876543210
LinkedIn: linkedin.com/in/navneetsharma
GitHub: github.com/navneetsharma

Professional Summary

Normal paragraph here.

Technical Skills

Frontend: React, TypeScript, JavaScript
Backend: Node.js, Express.js
Databases: MongoDB
Tools: Git, GitHub, Docker

Professional Experience

Frontend Developer – ABC Technologies
Jan 2024 – Present

Normal experience description here.

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}

Return ONLY the plain-text rewritten resume.
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
  