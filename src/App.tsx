import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/home/HomePage";
import StartPage from "./components/pages/start/StartPage";
import BetaPage from "./components/pages/beta/BetaPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [isEditorMode, setIsEditorMode] = useState(true);

  const handleEditorModeChange = (mode: boolean) => {
    setIsEditorMode(mode);
  };

  const AppLayout = () => (
    <div className="relative">
      <Layout isEditorMode={isEditorMode} onEditorModeChange={handleEditorModeChange} />
      <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[var(--current-bg,white)] from-30% via-[var(--current-bg,white)]/70 to-transparent" />
    </div>
  );

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-white scroll-smooth relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/start" element={<StartPage />} />
          <Route path="/beta" element={<BetaPage />} />
          <Route path="/:username" element={<AppLayout />} />
          <Route path="/app" element={<AppLayout />} />
        </Routes>
        <Analytics />
      </main>
    </BrowserRouter>
  );
}

export default App;
