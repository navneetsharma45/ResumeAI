import heroImage from "../assets/images/hero.svg";

function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-slate-900 px-8 pt-24 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 md:flex-row">
        
        {/* Left Side */}
        <div className="flex-1">
          <p className="mb-4 text-blue-400 font-semibold">
            🚀 AI Powered Resume Analyzer
          </p>

          <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Build a Resume That
            <span className="text-blue-400"> Gets You Hired</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Analyze your resume with AI, improve your ATS score,
            and prepare for interviews—all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition duration-300 hover:scale-105 hover:bg-blue-700">
              Upload Resume
            </button>

            <button className="rounded-xl border border-white px-6 py-3 transition duration-300 hover:scale-105 hover:bg-white hover:text-slate-900">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Resume AI Illustration"
            className="mx-auto w-full max-w-lg animate-bounce"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;