import React, { useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const DiscoverScreen: React.FC = () => {

   useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });

  const location: any = useLocation();

  const details: any = location.state.details;
  console.log("In discover", details);

  let genreString = "";
  for (let i = 0; i < details.artist.genres.length; i++) {
    if (i !== details.artist.genres.length - 1) {
      genreString += `${details.artist.genres[i]}, `;
    } else {
      genreString += `${details.artist.genres[i]}`;
    }
  }
  return (
    <div>
      <Link to="/">Back to search</Link>
      <h1>{details.track.name}</h1>
      <h3>
        Listen{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={details.track.external_urls.spotify}
        >
          here
        </a>
      </h3>
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
      <div>
        <img
          src={details.artist.images[0].url}
          alt={`${details.artist.name}`}
        />
        <img src={details.album.images[0].url} alt="album artwork" />
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
