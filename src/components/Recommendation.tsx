import React from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { saveRecommendation, removeRecommendation, setPlaying } from "../redux/mystroSlice";
import { getInfo } from "../utilities/generic-utils";

import "../styles/Recommendation.css";

interface Props {
  recommendation: any;
}

const Recommendation: React.FC<Props> = ({
  recommendation,
}) => {

  // Redux
  const saved: any = useSelector((state: any) => state.mystro.saved);
  const token: any = useSelector((state: any) => state.mystro.token);

  const dispatch = useDispatch();

  const isSaved = saved.filter(
    (item: any) => item.recommendation.id === recommendation.id
  );

  const handleDiscover = () => {
    const artistId = recommendation.artists[0].id;
    const albumId = recommendation.album.id;
    const trackId = recommendation.id;

    getInfo(artistId, albumId, trackId, recommendation, dispatch, token);
  };

  const handleSave = () => {
    dispatch(saveRecommendation({ recommendation }));
  };

  const handleRemove = () => {
    dispatch(removeRecommendation({ id: recommendation.id }));
  };

  return (
    <Grid item xs={10} sm={6} md={4} lg={3} xl={3} className="Recommendation">
      <h3>
        <span className="Recommendation-category">Artist:</span>{" "}
        {recommendation.artists[0].name}
      </h3>
      <h4>
        <span className="Recommendation-category">Album:</span>{" "}
        {recommendation.album.name} (
        {recommendation.album.release_date.slice(0, 4)})
      </h4>
      <h5>
        <span className="Recommendation-category">Track:</span>{" "}
        {recommendation.track_number}. {recommendation.name}
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
        {isSaved.length ? (
          <button onClick={handleRemove}>Remove</button>
        ) : (
          <button onClick={handleSave}>Save</button>
        )}
        <button
          onClick={() => dispatch(setPlaying(recommendation.external_urls.spotify))}
        >
          Listen
        </button>
      </div>
    </Grid>
  );
};

export default Recommendation;