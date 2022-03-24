import React from "react";
import "../styles/SavedRecommendation.css";

interface Props {
  recommendation: any;
  // getInfo?: (artistId: string, albumId: string, trackId: string) => void;
  saved: any[];
  setSaved: React.Dispatch<React.SetStateAction<any[]>>;
  setPlaying: React.Dispatch<any>;
}

const Recommendation: React.FC<Props> = ({ recommendation, saved, setSaved, setPlaying }) => {
  const handleDiscover = () => {
    // const artistId = recommendation.artists[0].id;
    // const albumId = recommendation.album.id;
    // const trackId = recommendation.id;

    alert("Whoops not working yet...")
    // With state management can add in get info directly, not working now as too messy to restructure...
      // getInfo(artistId, albumId, trackId, recommendation);
  };

  const isSaved = saved.filter(item => item.recommendation.id === recommendation.id);

  const handleSave = () => {
    setSaved([...saved, {recommendation}]);
  }

  const handleRemove = () => {
    setSaved(saved.filter(rec => rec.recommendation.id !== recommendation.id));
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
        <button onClick={()=> setPlaying(recommendation.external_urls.spotify)}>Listen</button>
      </div>
    </div>
  );
};

export default Recommendation;
