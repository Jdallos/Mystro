import { Dispatch } from "@reduxjs/toolkit";
import SpotifyUtilities from "../utilities/spotify-utils";
import { setDetails } from "../redux/mystroSlice";

export const getInfo = (
  artistId: string,
  albumId: string,
  trackId: string,
  recommendation: any,
  dispatch: Dispatch<any>,
  token: any,
) => {
  dispatch(setDetails(null));
  dispatch(setDetails({ recommendation: recommendation, name: "recommendation" }));
  SpotifyUtilities.getArtistInfo(artistId, token, dispatch);
  SpotifyUtilities.getAlbumInfo(albumId, token, dispatch);
  SpotifyUtilities.getTrackInfo(trackId, token, dispatch);
};