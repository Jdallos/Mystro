import { Dispatch } from "@reduxjs/toolkit";
import SpotifyUtilities from "../utilities/spotify-utils";
import { setDetails } from "../redux/mystroSlice";
import { ReduxState, TrackObjectFull } from "../types/schema";

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
  token: string
) => {
  dispatch(setDetails(null));
  dispatch(
    setDetails({ recommendation: recommendation, name: "recommendation" })
  );
  SpotifyUtilities.getArtistInfo(artistId, token, dispatch);
  SpotifyUtilities.getAlbumInfo(albumId, token, dispatch);
  SpotifyUtilities.getTrackInfo(trackId, token, dispatch);
};

/**
 * Sort the seeds according to filter criteria
 * 
 * @param state redux state
 * @param recData spotify seed data
 * @return list of spotify seeds
 */
export const sortSeeds = (
  state: ReduxState,
  recData: SpotifyApi.TrackObjectFull[]
): SpotifyApi.TrackObjectFull[] => {
  let sortedRecommendations = recData;

  const { byYear, byPopularity, byArtist } = state.sort;

  if (byYear.ascend) {
    sortedRecommendations = sortedRecommendations.sort(
      (a, b) =>
        Number(a.album.release_date.split("-")[0]) -
        Number(b.album.release_date.split("-")[0])
    );
  } else if (byYear.descend) {
    sortedRecommendations = sortedRecommendations.sort(
      (a, b) =>
        Number(b.album.release_date.split("-")[0]) -
        Number(a.album.release_date.split("-")[0])
    );
  }

  if (byPopularity.ascend) {
    sortedRecommendations = sortedRecommendations.sort(
      (a, b) => a.popularity - b.popularity
    );
  } else if (byPopularity.descend) {
    sortedRecommendations = sortedRecommendations.sort(
      (a, b) => b.popularity - a.popularity
    );
  }
  if (byArtist.ascend) {
    sortedRecommendations = sortedRecommendations.sort((a, b) => {
      return a.artists[0].name
        .normalize()
        .localeCompare(b.artists[0].name.normalize());
    });
  } else if (byArtist.descend) {
    sortedRecommendations = sortedRecommendations.sort((a, b) => {
      return b.artists[0].name
        .normalize()
        .localeCompare(a.artists[0].name.normalize());
    });
  }
  return sortedRecommendations;
};