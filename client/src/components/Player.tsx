import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeRecommendation, saveRecommendation } from "../redux/mystroSlice";
import { ReduxState, TrackObjectFull } from "../types/schema";
import { getDiscoveryInfo } from "../utilities/generic-utils";

const Player: React.FC = () => {
  // This is coming from now playing, needs to come from the saved recommendation
  const { spotify } = useSelector((state: ReduxState) => state.mystro.playing.external_urls);
  const playing = useSelector((state: ReduxState) => state.mystro.playing);
  const saved: TrackObjectFull[] = useSelector(
    (state: ReduxState) => state.mystro.saved
  );
  const token: string = useSelector((state: ReduxState) => state.mystro.token);
  const dispatch = useDispatch();

  const isSaved = saved.filter(
    (item: TrackObjectFull) => item.id === playing.id
  );

  const handleDiscover = () => {
    const artistId = playing.artists[0].id;
    const albumId = playing.album.id;
    const trackId = playing.id;

    getDiscoveryInfo(artistId, albumId, trackId, playing, dispatch, token);
  };

  return (
    <div id="Player">
      {spotify && (
        <div>
          <iframe
            id="musicPlayer"
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${spotify.slice(
              31
            )}?utm_source=generator`}
            width="100%"
            height="80"
            frameBorder="0"
            allowFullScreen
            title="musicPlayer"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          ></iframe>
          <div>
            <button onClick={handleDiscover}>Discover</button>
            {isSaved.length ? (
              <button
                onClick={() =>
                  dispatch(removeRecommendation({ id: playing.id }))
                }
              >
                Remove
              </button>
            ) : (
              <button
                onClick={() => dispatch(saveRecommendation({ ...playing }))}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;