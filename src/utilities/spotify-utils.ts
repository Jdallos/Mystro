import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setDetails } from "../redux/mystroSlice";

namespace SpotifyUtilities {


  export const getToken = async(dispatch: Dispatch<any> , setToken: ActionCreatorWithPayload<any, string>) => {
    try{
      const response = await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + window.btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
      })
      dispatch(setToken(response.data.access_token));
    } catch (error) {
      console.log("Error getting token:", error);
    }
  };

  export const getSearchId = async (search: string, setSearchId: React.Dispatch<React.SetStateAction<string>>, token: string ) =>{
    try {
      const response = await axios(`https://api.spotify.com/v1/search?q=${search}&type=artist`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setSearchId(response.data.artists.items[0]);
    } catch (e){
      console.log("error getting artist Id", e);
    }
  };

  export const getRecommendations = async (searchId: any, setRecommendations: React.Dispatch<any>, token: string, limit: string) => {
    try{
      const response = await axios(`https://api.spotify.com/v1/recommendations?seed_artists=${searchId.id}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setRecommendations({ ...response });
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

  export const getArtistInfo = async (artistId: any, token: string, dispatch: Dispatch<any>) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch(setDetails({  artist: response.data, name: "artist" }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

  export const getAlbumInfo = async (albumId: string, token: string, dispatch: Dispatch<any>) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch(setDetails({ album: response.data, name: "album" }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

  export const getTrackInfo = async (trackId: string, token: string, dispatch: Dispatch<any>) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch(setDetails({ track: response.data, name: "track" }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };
};

export default SpotifyUtilities;
