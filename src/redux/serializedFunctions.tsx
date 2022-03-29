// This code is no longer in use, could serialize functions here if wanted to store and pass in redux state.

// import { Dispatch } from "@reduxjs/toolkit";
// import SpotifyUtilities from "../utilities/spotify-utils";
// import { setDetails } from "./mystroSlice";

// export const getInfo = (
//   artistId: string,
//   albumId: string,
//   trackId: string,
//   recommendation: any,
//   dispatch: Dispatch<any>,
//   token: any,
// ) => {
//   dispatch(setDetails(null));
//   dispatch(setDetails({ recommendation: recommendation, name: "recommendation" }));
//   SpotifyUtilities.getArtistInfo(artistId, token, dispatch);
//   SpotifyUtilities.getAlbumInfo(albumId, token, dispatch);
//   SpotifyUtilities.getTrackInfo(trackId, token, dispatch);
// };

// const serializeFunction = (func: any) => {
//   return func.toString();
// }

// export const getInfoSerialized = serializeFunction(getInfo);

// export const deserializeFunction = (funcString: any) => (
//   eval(funcString)
// );

export {}