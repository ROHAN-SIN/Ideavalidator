import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg">
            <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center text-ink text-sm font-bold">
              V
            </span>
            Verdict
          </Link>
          <span className="text-xs text-muted font-mono hidden sm:block">
            AI Startup Idea Validator
          </span>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted">
        Built with the MERN stack — MongoDB · Express · React · Node.js
      </footer>
    </div>
  );
}
