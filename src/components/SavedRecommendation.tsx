import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeRecommendation, setPlaying } from "../redux/mystroSlice";
import { getDiscoveryInfo } from "../utilities/generic-utils";
import { ReduxState } from "../types/schema";
import "../styles/SavedRecommendation.css";

interface Props {
  // recommendation: TrackObjectFull;
  recommendation: any;
}

/**
 *
 *Single saved recommendation
 *
 * @param recommendation single recommendation
 * @returns single recommendation display
 */
const SavedRecommendation: React.FC<Props> = ({ recommendation }) => {

  // Redux
  const token: string = useSelector((state: ReduxState) => state.mystro.token);
  const dispatch = useDispatch();

  /**
   * Provides Id's to combine data from serveral spotify API endpoints
   */
  const handleDiscover = () => {
    const artistId = recommendation.artists[0].id;
    const albumId = recommendation.album.id;
    const trackId = recommendation.id;

    getDiscoveryInfo(artistId, albumId, trackId, recommendation, dispatch, token);
  };

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
        <button onClick={handleRemove}>Remove</button>
        <button onClick={()=> dispatch(setPlaying(recommendation.external_urls.spotify))}>Listen</button>
      </div>
    </div>
  );
};

export default SavedRecommendation;