import heroImage from "../assets/images/hero.svg";

function Hero() {
  return (
    <section className="min-h-screen bg-slate-900 text-white flex items-center px-8 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
        
        {/* Left Side */}
        <div className="flex-1">
          <p className="mb-4 text-blue-400 font-semibold">
            🚀 AI Powered Resume Analyzer
          </p>

          <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">
            Build a Resume That
            <span className="text-blue-400"> Gets You Hired</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Analyze your resume with AI, improve your ATS score,
            and prepare for interviews—all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700">
              Upload Resume
            </button>

            <button className="rounded-xl border border-white px-6 py-3 hover:bg-white hover:text-slate-900">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Resume AI Illustration"
            className="w-full max-w-lg mx-auto"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;