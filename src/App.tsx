import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Player from "./components/Player";

import SavedList from "./components/SavedList";
import DiscoverScreen from "./screens/DiscoverScreen";
import HomeScreen from "./screens/HomeScreen";
import "./styles/App.css";

/**
 * Mystro App
 *
 * @returns Mystro App
 */
const App: React.FC = () => {

  return (
    <div className="App">
      <h1><Link className="App-header" to="/">Mystro</Link></h1>
      <Player />
      <SavedList />
      <Routes>
        <Route
          path="/"
          element={
            <HomeScreen />
          }
        />
        <Route
          path="/discover/:id"
          element={<DiscoverScreen />}
        />
      </Routes>
      <footer>Mystro created by JD Web Dev, powered by Spotify</footer>
    </div>
  );
};

export default App;