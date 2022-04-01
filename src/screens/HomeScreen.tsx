import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import { setToken, setDetails } from "../redux/mystroSlice";
import { Recommendations, Discover, ArtistSearch, ReduxState } from "../types/schema";
import "../styles/HomeScreen.css";

/**
 * Homescreen for Mystro
 *
 * @returns Homescreen display
 */
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

  /**
   * Get API access token
   */
  useEffect(() => {
    SpotifyUtilities.getToken(dispatch, setToken);
    // This resets details to prevent the navigation sticking to discovery page
    dispatch(setDetails(undefined));
    // eslint-disable-next-line
    details = undefined;
  }, []);

  /**
   * Get recommendations API call and update loading state
   */
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

  /**
   * Navigate to individual recommendation discover page when all data has been returned from API
   */
  useEffect(() => {
    if (details?.artist?.id && details?.album?.id && details?.track?.id) {
      navigate(`/discover/${details.track.id}`, { state: { details } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  /**
   * Get form search Id from spotify API
   */
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