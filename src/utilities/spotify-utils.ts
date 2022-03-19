import axios from "axios";

namespace SpotifyUtilities {

  export const getToken = async(setToken:React.Dispatch<React.SetStateAction<string>>) => {
    try{
      const response = await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + window.btoa(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
      })
      setToken(response.data.access_token);
    } catch (error) {
      console.log("Error  is", error);
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

  export const getRecommendations = async (searchId: any, setRecommendations: React.Dispatch<any>, token: string) => {
    try{
      const response = await axios(`https://api.spotify.com/v1/recommendations?seed_artists=${searchId.id}`, {
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
 
  export const getArtistInfo = async (artistId: any, setDetails: React.Dispatch<any>, token: string) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/artists/${artistId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setDetails((prev: any) =>  ({ ...prev, artist: response.data }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

  export const getAlbumInfo = async (albumId: string, setDetails: React.Dispatch<any>, token: string) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setDetails((prev: any) =>({...prev, album: response.data }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };

  export const getTrackInfo = async (trackId: string, setDetails: React.Dispatch<any>, token: string) => {
    try{
      const response = await axios.get<any>(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      setDetails((prev: any) =>({...prev, track: response.data }));
    } catch(e){
      console.log("error getting recommendations", e);
    }
  };
};

export default SpotifyUtilities;
