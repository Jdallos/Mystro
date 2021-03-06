import { createSlice } from "@reduxjs/toolkit";
// If wanted to serialize functions to store in redux.
// import { getInfoSerialized } from "../redux/serializedFunctions";
import { TrackObjectFull } from "../types/schema";

const getLocalSaved = (): TrackObjectFull[] => {
  const JSONSaved = localStorage.getItem("mystro");
  console.log(JSONSaved);
  if (JSONSaved) return JSON.parse(JSONSaved);
  return [];
};
const saved = getLocalSaved();

/**
 * Redux Slice
 */
const mystroSlice = createSlice({
  name: "mystro",
  initialState: {
    saved: saved,
    playing: {
      external_urls: {
        spotify: ""
      },
    },
    token: "",
    details: {},
    goBack: false,
    previousSearch: {
      previousRecommendations: [],
      previousSearchId:undefined,
    },
    // If wanted to serialize functions to store in redux.
    // functions: {
    //   getInfo: getInfoSerialized,
    // }
  } as any,
  reducers: {
    saveRecommendation: (state, action) => {
      const newRecommendation: TrackObjectFull = {
        ...action.payload
      };
      state.saved.push(newRecommendation);
      // Could put in own function...
      const localSave = JSON.stringify(state.saved);
      localStorage.setItem("mystro", localSave);
    },
    removeRecommendation: (state, action) => {
      const newSaveState = state.saved.filter(
        (rec: TrackObjectFull) => rec.id !== action.payload.id
      );
      state.saved = newSaveState;
      // Could put in own function...
      const localSave = JSON.stringify(state.saved);
      localStorage.setItem("mystro", localSave);
    },
    setPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setDetails: (state, action) => {
      if (action.payload) {
        const name = action.payload.name;
        state.details = { ...state.details, [name]: action.payload[name] }
      } else {
        state.details = {};
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setGoBack: (state) => {
      state.goBack = !state.goBack;
    },
    storePrevious: (state, action) => {
      state.previousSearch.previousRecommendations = action.payload.recommendations;
      if (action.payload.searchId) {
        state.previousSearch.previousSearchId = action.payload.searchId;
      }
    }
  }
});

export const { saveRecommendation, removeRecommendation, setPlaying, setDetails, setToken, setGoBack, storePrevious } = mystroSlice.actions;

export default mystroSlice.reducer;