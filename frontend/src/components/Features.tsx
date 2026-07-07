function Features() {
 const features = [
  {
    icon: "🤖",
    title: "AI Resume Analysis",
    description: "Get smart AI suggestions to improve your resume.",
  },
  {
    icon: "📊",
    title: "ATS Score Checker",
    description: "Know how ATS systems evaluate your resume.",
  },
  {
    icon: "🎯",
    title: "Interview Questions",
    description: "Generate interview questions using AI.",
  },
  {
    icon: "📄",
    title: "PDF Upload",
    description: "Upload your resume securely in PDF format.",
  },
];

  return (
  <section className="bg-slate-900 py-20 text-white">
    <div className="mx-auto max-w-7xl px-6">
      <h2 className="text-center text-4xl font-bold">
        Why Choose ResumeAI?
      </h2>
<p className="mt-4 text-center text-lg text-gray-400">
  Everything you need to build a resume that stands out.
</p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {features.map((feature) => (
          <div
  key={feature.title}
  className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-slate-700"
>
  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-3xl">
    {feature.icon}
  </div>

<h3 className="mt-4 text-2xl font-semibold text-blue-400">
        {feature.title}
  </h3>

  <p className="mt-2 text-gray-300">
    {feature.description}
  </p>
</div>
        ))}
      </div>
    </div>
  </section>
);
}

export default Features;