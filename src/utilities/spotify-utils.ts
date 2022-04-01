import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setDetails } from "../redux/mystroSlice";
import { Recommendations, ArtistSearch } from "../types/schema";

namespace SpotifyUtilities {
/**
 * Get spotify access token
 *
 * @param dispatch redux dispatch
 * @param setToken redux action
 */
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

/**
 *
 *Get Id from spotify matching form input
 *
 * @param search string from form input
 * @param setSearchId React dispatch function
 * @param token API access token
 */
  export const getSearchId = async (search: string, setSearchId: React.Dispatch<React.SetStateAction<ArtistSearch | undefined>>, token: string ) =>{
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

/**
 *
 * @param searchId Search response data
 * @param setRecommendations react dispatch to update recommendations
 * @param token API access token
 * @param limit number of recommendations to recieve from API
 */
  export const getRecommendations = async (searchId: ArtistSearch, setRecommendations: React.Dispatch<React.SetStateAction<Recommendations | undefined>>, token: string, limit: string) => {
    try{
      const response = await axios(`https://api.spotify.com/v1/recommendations?seed_artists=${searchId.id}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setRecommendations({ ...response.data });
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

/**
 *
 *Get the Artist info from Spotify API
 *
 * @param artistId API artist id
 * @param token API access token
 * @param dispatch redux dispatch
 */
  export const getArtistInfo = async (artistId: string, token: string, dispatch: Dispatch<any>) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      dispatch(setDetails({  artist: response.data, name: "artist" }));
    } catch(e){
      console.log("error getting artist info", e);
    }
  };

/**
 *
 *Get album info from Spotify API
 *
 * @param albumId API album id
 * @param token API access token
 * @param dispatch Redux dispatch
 */
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
      console.log("error getting album info", e);
    }
  };

/**
 *
 *Get track info from Spotify API
 *
 * @param trackId API track id
 * @param token API access token
 * @param dispatch Redux dispatch
 */
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
      console.log("error getting track info", e);
    }
  };
};

export default SpotifyUtilities;
