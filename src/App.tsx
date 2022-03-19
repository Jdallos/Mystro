import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import DiscoverScreen from "./screens/DiscoverScreen";
import HomeScreen from "./screens/HomeScreen";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Mystro</h1>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/discover/:id" element={<DiscoverScreen />} />
      </Routes>
    </div>
  );
};

export default App;
