import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import { setToken, setDetails, storePrevious, setGoBack } from "../redux/mystroSlice";
import {
  Recommendations,
  Discover,
  ArtistSearch,
  ReduxState,
} from "../types/schema";
import "../styles/HomeScreen.css";
import RecommendationSettings from "../components/RecommendationSettings";

/**
 * Homescreen for Mystro
 *
 * @returns Homescreen display
 */
const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [searchId, setSearchId] = useState<ArtistSearch[]>();
  const [recommendations, setRecommendations] = useState<Recommendations>();
  const [limit, setLimit] = useState<string>("20");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);

  // Redux
  let details: Discover | undefined = useSelector(
    (state: ReduxState) => state.mystro.details
  );
  const { token, goBack, previousSearch } = useSelector((state: ReduxState) => state.mystro);
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
    if (searchId && previousSearch.previousRecommendations.length === 0) {
      const waitRecs = async () => {
        await SpotifyUtilities.getRecommendations(
          searchId[0],
          setRecommendations,
          token,
          limit
        );
        // This is here to keep the loading animation inplace until RecommendationList rendering
        setIsLoading(false);
      };
      waitRecs();
    }
    // HAVING TO DO THIS IS AN INDICATOR IT SHOULD PROBABLY BE REFACTORED IN SOME WAY...
    // eslint-disable-next-line
  }, [token, searchId, limit]);

  let navigate = useNavigate();

  /**
   * Navigate to individual recommendation discover page when all data has been returned from API
   */
  useEffect(() => {
    if (details?.artist?.id && details?.album?.id && details?.track?.id) {
      dispatch(storePrevious({ recommendations: recommendations, searchId: searchId }));
      navigate(`/discover/${details.track.id}`, { state: { details } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  /**
   * Set recommendations based on previous recommendations when returning from the discovery screen
   */
  useEffect(() => {
    if (goBack) {
      // Currently recommendations is set to any to pass into set- change and move in to redux state?
      setIsLoading(true);
      // Prevent possible error if there was no previous search (due to going discover via a saved rec before searching)
      if(previousSearch.previousRecommendations) {
        setRecommendations(previousSearch.previousRecommendations);
        setSearchId(previousSearch.previousSearchId);
      } else {
        setIsLoading(false);
      }
      dispatch(setGoBack());
    }
  },[goBack, previousSearch, dispatch]);

  /**
   * Stops the loading spinner when previous recommendations are restored after returning from discovery page
   */
  useEffect(() => {
    if (recommendations) {
      setIsLoading(false);
    }
  }, [recommendations])

  /**
   * Get form search Id from spotify API
   */
  const searchInputId = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(storePrevious({ recommendations: [], searchId: undefined }));
    setIsLoading(true);
    SpotifyUtilities.getSearchId(
      search,
      setSearchId,
      token,
      setIsLoading,
      setSearchError
    );
  };

  /**
   * Change the seed artist for recommendations
   */
  const changeRecommendationSeed = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(true);
    const selected = searchId?.filter((seed) => e.target.value === seed.name);
    if (selected && searchId) {
      const newArr: ArtistSearch[] = [
        selected[0],
        ...searchId.filter((seed) => seed.name !== e.target.value),
      ];
      setSearchId(newArr);
    }
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
        <>
          { 
            searchId &&
            <RecommendationSettings 
              searchId={ searchId }
              changeRecommendationSeed={ changeRecommendationSeed }
            />
          }
          <RecommendationsList
            searchItem={searchId ? searchId[0] : undefined}
            recommendations={recommendations}
          />
        </>
      ) : searchError ? (
        <h4>Something went wrong, try a different search</h4>
      ) : (
        <h4>Try a search...</h4>
      )}
    </div>
  );
};

export default HomeScreen;
