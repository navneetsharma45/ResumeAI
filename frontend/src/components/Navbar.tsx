function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-8 py-5 text-white shadow-lg backdrop-blur-md">
      <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
        ResumeAI
      </h1>

      <div className="space-x-6">
        <button className="font-medium transition duration-300 hover:text-blue-400">
          Login
        </button>

        <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium transition duration-300 hover:scale-105 hover:bg-blue-700">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;