import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { saveRecommendation, removeRecommendation, setPlaying, setGoBack } from "../redux/mystroSlice";
import { Discover, TrackObjectFull, ReduxState } from "../types/schema";
import "../styles/DiscoverScreen.css";

/**
 *
 * Discover screen for single recommendation details
 *
 * @returns Discover screen display
 */
const DiscoverScreen: React.FC = () => {

  useLayoutEffect(() => {
        window.scrollTo(0, 0)
  },[]);

  // Redux
  const saved: TrackObjectFull[] = useSelector((state: ReduxState) => state.mystro.saved);
  const dispatch = useDispatch();

  //React Router
  const location: any = useLocation();
  const details: Discover = location.state.details;
  
  let genreString = "";
  for (let i = 0; i < details.artist.genres.length; i++) {
    if (i !== details.artist.genres.length - 1) {
      genreString += `${details.artist.genres[i]}, `;
    } else {
      genreString += `${details.artist.genres[i]}`;
    }
  };

  const isSaved = saved.filter((rec: any) => rec.id === details.recommendation.id);

  const handleSave = () => {
    let recommendation = details.recommendation;
    dispatch(saveRecommendation({ ...recommendation }));
  }

  const handleRemove = () => {
    dispatch(removeRecommendation({ id: details.recommendation.id }));
  }

  return (
    <div className="DiscoverScreen">
      <Link 
        className="DiscoverScreen-back" 
        to="/"
        onClick={() => {
          dispatch(setGoBack());
        }}
      >
        Back to homepage
      </Link>
      <h1>{details.track.name}</h1>
      <button onClick={()=> dispatch(setPlaying(details.track.external_urls.spotify))}>Listen</button>
      {isSaved.length ? <button onClick={handleRemove}>Remove</button> : <button onClick={handleSave}>Save</button> }
      <h2>Track notes</h2>
      <p>
        {details.track.name} was released by {details.artist.name} in{" "}
        {details.album.release_date.slice(0, 4)}.
      </p>
      <p>
        {details.track.name} is track {details.track.track_number} from the
        album "{details.album.name}".
      </p>
      <p>
        {details.artist.name} is known for playing the following genres: {genreString}.
      </p>
      <div className="Image-container">
        <img
          src={details.artist.images[0].url}
          alt={`${details.artist.name}`}
        />
        <img
          src={details.album.images[0].url}
          alt="album artwork"
        />
      </div>
      <h4>{details.album.name} track list:</h4>
      <ol>
        {details.album.tracks.items.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default DiscoverScreen;