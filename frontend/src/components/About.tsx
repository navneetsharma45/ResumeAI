function About() {
  return (
     <section className="bg-slate-950 py-20 text-white">
    <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
      <h2 className="text-4xl font-bold">
        About ResumeAI
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
        ResumeAI helps job seekers improve their resumes using AI-powered
        analysis, ATS scoring, and personalized interview preparation.
      </p>
      <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition duration-300 hover:scale-105 hover:bg-blue-700">
  Learn More
</button>
    </div>
  </section>
  );
}

export default About;