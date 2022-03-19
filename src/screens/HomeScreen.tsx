import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import SpotifyUtilities from "../utilities/spotify-utils";
import RecommendationsList from "../components/RecommendationList";
import Form from "../components/Form";
import "../styles/HomeScreen.css";

const HomeScreen: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchId, setSearchId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<any>();
  const [details, setDetails] = useState<any>();

  useEffect(() => {
    SpotifyUtilities.getToken(setToken);
  }, []);

  useEffect(() => {
    console.log(token);
  }, [token]);

  // This is running every time after the initial search, its a problem, memo the form in seperate component? Look into
  useEffect(() => {
    console.log("triggereduse");
    if (searchId !== ""){
      SpotifyUtilities.getRecommendations(searchId, setRecommendations, token);
    }
  }, [token, searchId]);

  let navigate = useNavigate();

  useEffect(()=>{
    if(details?.artist?.id && details?.album?.id && details?.track?.id){
      navigate(`/discover/${details.track.id}`, { state: { details } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  const searchInputId = (e: React.FormEvent) => {
    e.preventDefault();
    SpotifyUtilities.getSearchId(search, setSearchId, token);
  }

  const getInfo = async (artistId: string, albumId: string, trackId: string) => {
    setDetails(null);
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
      />
      {
        recommendations &&
        <RecommendationsList
          searchItem={searchId}
          recommendations={recommendations}
          getInfo={getInfo}
        />
      }
    </div>
  );
};

export default HomeScreen;
