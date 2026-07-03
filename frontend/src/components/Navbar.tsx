function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-5 bg-slate-950 text-white shadow-lg">
      <h1 className="text-2xl font-bold text-blue-400">
        ResumeAI
      </h1>

      <div className="space-x-6">
        <button className="hover:text-blue-400">
          Login
        </button>

        <button className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700">
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;