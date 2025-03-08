import { useState } from "react";
import Layout from "./components/layout";

function App() {
	return (
		<main className="min-h-screen bg-white scroll-smooth">
			<Layout />
			<div className="fixed bottom-0 left-0 right-0 h-40 pointer-events-none bg-gradient-to-t from-white from-30% via-white/70 to-transparent" />
		</main>
	);
}

export default App;
