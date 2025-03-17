import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LandingScreen from "./components/LandingScreen";
import HomeScreen from "./components/HomeScreen";
import BlackHole from "./components/SolarSystem";
import { authClient } from "./utils/auth-client";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuthStatus = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-white scroll-smooth">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/start"
            element={<LandingScreen onLogin={handleLogin} />}
          />
          <Route path="/solar" element={<BlackHole />} />
          <Route
            path="/app"
            element={
              <>
                <Layout />
                <div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-[var(--current-bg,white)] from-30% via-[var(--current-bg,white)]/70 to-transparent" />
              </>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
