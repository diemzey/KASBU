import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import LandingScreen from "./components/LandingScreen";
import HomeScreen from "./components/HomeScreen";
import BlackHole from './components/SolarSystem';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	return (
		<BrowserRouter>
			<main className="min-h-screen bg-white scroll-smooth">
				<Routes>
					<Route path="/" element={<HomeScreen />} />
					<Route path="/start" element={<LandingScreen onLogin={() => setIsLoggedIn(true)} />} />
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
