import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { saveRecommendation, removeRecommendation, setPlaying } from "../redux/mystroSlice";
import "../styles/DiscoverScreen.css";

const DiscoverScreen: React.FC = () => {

   useLayoutEffect(() => {
        window.scrollTo(0, 0)
    },[]);

  // Redux
  const saved: any = useSelector((state: any) => state.mystro.saved);
  const dispatch = useDispatch();

  // Passing data between routes, could use params and then make API call based on the ID.
  const location: any = useLocation();
  const details: any = location.state.details;

  let genreString = "";
  for (let i = 0; i < details.artist.genres.length; i++) {
    if (i !== details.artist.genres.length - 1) {
      genreString += `${details.artist.genres[i]}, `;
    } else {
      genreString += `${details.artist.genres[i]}`;
    }
  };

  const isSaved = saved.filter((rec: any) => rec.recommendation.id === details.recommendation.id);

  const handleSave = () => {
    let recommendation = details.recommendation;
    dispatch(saveRecommendation({ recommendation }));
  }

  const handleRemove = () => {
    dispatch(removeRecommendation({ id: details.recommendation.id }));
  }

  return (
    <div className="DiscoverScreen">
      <Link className="DiscoverScreen-back" to="/">Back to search</Link>
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
        {details.album.tracks.items.map((track:any) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ol>
    </div>
  );
};

export default DiscoverScreen;