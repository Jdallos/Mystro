import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveRecommendation, removeRecommendation, setPlaying } from "../redux/mystroSlice";
import { getInfo } from "../utilities/generic-utils";
import "../styles/SavedRecommendation.css";

interface Props {
  recommendation: any;
}

const Recommendation: React.FC<Props> = ({ recommendation }) => {

  // Redux
  const saved: any = useSelector((state: any) => state.mystro.saved);
  const token: any = useSelector((state: any) => state.mystro.token);
  const dispatch = useDispatch();

  const handleDiscover = () => {
    const artistId = recommendation.artists[0].id;
    const albumId = recommendation.album.id;
    const trackId = recommendation.id;

    getInfo(artistId, albumId, trackId, recommendation, dispatch, token);
  };

  const isSaved = saved.filter((rec: any) => rec.recommendation.id === recommendation.id);

  // This will never be rendered, can be removed along with the save button...
  const handleSave = () => {
    dispatch(saveRecommendation({ recommendation }));
  }

  const handleRemove = () => {
    dispatch(removeRecommendation({ id: recommendation.id }));
  }

  return (
    <div className="SavedRecommendation">
      <h5>
        <span>{recommendation.name}</span> by {recommendation.artists[0].name}
      </h5>
      <br />
      <img
        src={recommendation.album.images[0].url}
        alt={recommendation.album.name}
      />
      <div>
        <button onClick={handleDiscover}>Discover</button>
        {isSaved.length ? <button onClick={handleRemove}>Remove</button> : <button onClick={handleSave}>Save</button> }
        <button onClick={()=> dispatch(setPlaying(recommendation.external_urls.spotify))}>Listen</button>
      </div>
    </div>
  );
};

export default Recommendation;