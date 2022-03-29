import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./styles/App.css";
import SavedList from "./components/SavedList";
import DiscoverScreen from "./screens/DiscoverScreen";
import HomeScreen from "./screens/HomeScreen";

const App: React.FC = () => {

  const playing: any = useSelector((state: any) => state.mystro.playing);

  return (
    <div className="App">
      <h1><Link className="App-header" to="/">Mystro</Link></h1>
      {playing && <iframe
        id="musicPlayer"
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${playing.slice(
          31
        )}?utm_source=generator`}
        width="100%"
        height="80"
        frameBorder="0"
        allowFullScreen
        title="musicPlayer"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
      ></iframe>}
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