import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import "../styles/HomeScreen.css";

interface Props {
  saved: any[];
  setSaved: React.Dispatch<React.SetStateAction<any[]>>;
  setPlaying: React.Dispatch<React.SetStateAction<any[]>>;
}

const HomeScreen: React.FC<Props> = ({ saved, setSaved, setPlaying }) => {
  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>();
  const [details, setDetails] = useState<any>();
  const [limit, setLimit] = useState<any>("20");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    SpotifyUtilities.getToken(setToken);
  }, []);

  useEffect(() => {
    if (searchId !== "") {
      const waitRecs = async () => {
        await SpotifyUtilities.getRecommendations(
          searchId,
          setRecommendations,
          token,
          limit
        );
        setIsLoading(false);
      };
      waitRecs();
    }
  }, [token, searchId, limit]);

  let navigate = useNavigate();

  useEffect(() => {
    if (details?.artist?.id && details?.album?.id && details?.track?.id) {
      navigate(`/discover/${details.track.id}`, { state: { details } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  const searchInputId = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    SpotifyUtilities.getSearchId(search, setSearchId, token);
  };

  const getInfo = async (
    artistId: string,
    albumId: string,
    trackId: string,
    recommendation: any
  ) => {
    setDetails(null);
    setDetails((prev: any) => ({ ...prev, recommendation: recommendation }));
    await SpotifyUtilities.getArtistInfo(artistId, setDetails, token);
    await SpotifyUtilities.getAlbumInfo(albumId, setDetails, token);
    await SpotifyUtilities.getTrackInfo(trackId, setDetails, token);
  };

  return (
    <div className="HomeScreen">
      <Form
        searchInputId={searchInputId}
        search={search}
        setSearch={setSearch}
        setLimit={setLimit}
      />
      {isLoading ? (
        <LinearProgress color="success" />
      ) : recommendations ? (
        <RecommendationsList
          searchItem={searchId}
          recommendations={recommendations}
          getInfo={getInfo}
          saved={saved}
          setSaved={setSaved}
          setPlaying={setPlaying}
        />
      ) : (
        <h4>Try a search...</h4>
      )}
    </div>
  );
};

export default memo(HomeScreen);