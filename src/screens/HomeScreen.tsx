import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import "../styles/HomeScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setDetails } from "../redux/mystroSlice";
import { Recommendations, Discover, ArtistSearch, ReduxState } from "../types/schema";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchId, setSearchId] = useState<ArtistSearch>();
  const [recommendations, setRecommendations] = useState<Recommendations>();
  const [limit, setLimit] = useState<string>("20");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redux
  let details: Discover|undefined = useSelector((state: ReduxState) => state.mystro.details);
  const token: string = useSelector((state: ReduxState) => state.mystro.token);
  const dispatch = useDispatch();

  useEffect(() => {
    SpotifyUtilities.getToken(dispatch, setToken);
    // This resets details to prevent the navigation sticking to discovery page
    dispatch(setDetails(undefined));
    // eslint-disable-next-line
    details = undefined;
  }, []);

  useEffect(() => {
    if (searchId) {
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
        />
      ) : (
        <h4>Try a search...</h4>
      )}
    </div>
  );
};

export default HomeScreen;