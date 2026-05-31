import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Manufacturer from "./pages/Manufacturer";
import Distributor from "./pages/Distributor";
import Retailer from "./pages/Retailer";
import Consumer from "./pages/Consumer";

function App() {
  const [theme, setTheme] = useState("dark");
  const isDark = theme === "dark";
  const backgroundClass = isDark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";
  const navClass = isDark ? "bg-slate-950/95 border-slate-800 text-slate-100" : "bg-white/95 border-slate-200 text-slate-900";
  const navLinkClass = isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900";
  const overlayClass = isDark
    ? "bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_30%)]"
    : "bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_30%)]";

  return (
    <BrowserRouter>
      <div className={`${backgroundClass} min-h-screen relative overflow-hidden`}>
        <div className={`pointer-events-none absolute inset-0 opacity-70 ${overlayClass}`} />

        <div className="relative">
          <nav className={`sticky top-0 z-30 border-b ${navClass}`}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
              <Link to="/" className="flex items-center gap-3 text-2xl font-semibold tracking-tight transition hover:opacity-90">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-fuchsia-500 text-white shadow-lg shadow-sky-500/30">
                  BS
                </span>
                <span>BlockSole</span>
              </Link>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
                  <Link to="/manufacturer" className={navLinkClass}>Manufacturer</Link>
                  <Link to="/distributor" className={navLinkClass}>Distributor</Link>
                  <Link to="/retailer" className={navLinkClass}>Retailer</Link>
                  <Link to="/consumer" className={navLinkClass}>Consumer</Link>
                </div>
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isDark ? "bg-white text-slate-950" : "bg-slate-950 text-white"}`}
                >
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </nav>

          <main className="relative mx-auto max-w-7xl px-6 pb-16 pt-10">
            <Routes>
              <Route path="/" element={<Home theme={theme} />} />
              <Route path="/manufacturer" element={<Manufacturer theme={theme} />} />
              <Route path="/distributor" element={<Distributor theme={theme} />} />
              <Route path="/retailer" element={<Retailer theme={theme} />} />
              <Route path="/consumer" element={<Consumer theme={theme} />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;