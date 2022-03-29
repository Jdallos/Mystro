import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import "../styles/HomeScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setDetails } from "../redux/mystroSlice";


const HomeScreen: React.FC = () => {
  // const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>();
  // const [details, setDetails] = useState<any>();
  const [limit, setLimit] = useState<any>("20");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redux
  let details: any = useSelector((state: any) => state.mystro.details);
  const token: any = useSelector((state: any) => state.mystro.token);
  // const getInfo: any = useSelector((state: any) => state.mystro.functions.getInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    SpotifyUtilities.getToken(dispatch, setToken);
    // This resets details to prevent the navigation to discovery page
    dispatch(setDetails(undefined));
    details = undefined;
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

  // const getInfo = async (
  //   artistId: string,
  //   albumId: string,
  //   trackId: string,
  //   recommendation: any
  // ) => {
  //   // setDetails(null);
  //   // setDetails({ recommendation: recommendation, name: "recommendation" });
  //   dispatch(setDetails(null));
  //   dispatch(setDetails({ recommendation: recommendation, name: "recommendation" }));

  //   await SpotifyUtilities.getArtistInfo(artistId, token, dispatch);
  //   await SpotifyUtilities.getAlbumInfo(albumId, token, dispatch);
  //   await SpotifyUtilities.getTrackInfo(trackId, token, dispatch);
  // };

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
          // getInfo={getInfo}
        />
      ) : (
        <h4>Try a search...</h4>
      )}
    </div>
  );
};

export default memo(HomeScreen);