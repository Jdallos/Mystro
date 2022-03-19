import React from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import "../styles/Recommendation.css";
import SpotifyUtilities from "../utilities/spotify-utils";

interface Props {
  recommendation: any;
  getInfo: (artistId: string, albumId: string, trackId: string) => void;
}

const Recommendation: React.FC<Props> = ({ recommendation, getInfo }) => {
  const handleDiscover = () => {
    const artistId = recommendation.artists[0].id;
    const albumId = recommendation.album.id;
    const trackId = recommendation.id;

    getInfo(artistId, albumId, trackId);
  };
  return (
    <Grid item xs={10} sm={6} md={4} lg={3} xl={3} className="Recommendation">
      <h3>Artist: {recommendation.artists[0].name}</h3>
      <h4>
        Album: {recommendation.album.name} (
        {recommendation.album.release_date.slice(0, 4)})
      </h4>
      <h5>
        Track: {recommendation.track_number}. {recommendation.name}
      </h5>
      <Rating
        name="popularity"
        defaultValue={recommendation.popularity / 10 / 2}
        precision={0.25}
        max={5}
        readOnly
      />
      <br />
      <img
        src={recommendation.album.images[0].url}
        alt={recommendation.album.name}
      />
      <div>
        <button onClick={handleDiscover}>Discover</button>
        <a
          target="_blank"
          rel="noreferrer"
          href={recommendation.external_urls.spotify}
        >
          here
        </a>
      </div>
    </Grid>
  );
};

export default Recommendation;
