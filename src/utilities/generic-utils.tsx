import { Dispatch } from "@reduxjs/toolkit";
import SpotifyUtilities from "../utilities/spotify-utils";
import { setDetails } from "../redux/mystroSlice";
import { TrackObjectFull } from "../types/schema";

/**
 * Get data from Artist, Album & Track API endpoints
 *
 * @param artistId string from API
 * @param albumId string from API
 * @param trackId string from API
 * @param recommendation data object
 * @param dispatch Redux dispatch function
 * @param token access token string
 */
export const getDiscoveryInfo = (
  artistId: string,
  albumId: string,
  trackId: string,
  recommendation: TrackObjectFull,
  dispatch: Dispatch<any>,
  token: string,
) => {
  dispatch(setDetails(null));
  dispatch(setDetails({ recommendation: recommendation, name: "recommendation" }));
  SpotifyUtilities.getArtistInfo(artistId, token, dispatch);
  SpotifyUtilities.getAlbumInfo(albumId, token, dispatch);
  SpotifyUtilities.getTrackInfo(trackId, token, dispatch);
};