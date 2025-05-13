import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <React.StrictMode>
      <HashRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here */}
      </Routes>

    </HashRouter>
    </React.StrictMode>
  );
}

export default App;
