import { createSlice } from "@reduxjs/toolkit";
// If wanted to serialize functions to store in redux.
// import { getInfoSerialized } from "../redux/serializedFunctions";
import { TrackObjectFull } from "../types/schema";

// Get access to actions and reducers
const mystroSlice = createSlice({
  name: "mystro",
  initialState: {
    saved: [],
    playing: "",
    token: "",
    details: {},
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
    },
    removeRecommendation: (state, action) => {
      const newSaveState = state.saved.filter(
        (rec: TrackObjectFull) => rec.id !== action.payload.id
      );
      state.saved = newSaveState;
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
  }
});

export const { saveRecommendation, removeRecommendation, setPlaying, setDetails, setToken } = mystroSlice.actions;

export default mystroSlice.reducer;