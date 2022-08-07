import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// If wanted to serialize functions to store in redux.
// import { getInfoSerialized } from "../redux/serializedFunctions";
import {  TrackObjectFull } from "../types/schema";


// Move these functions above the slice into utils...
const getLocalSaved = (): TrackObjectFull[] => {
  const JSONSaved = localStorage.getItem("mystro");
  if (JSONSaved) return JSON.parse(JSONSaved);
  return [];
};

const saved = getLocalSaved();

const saveRecommendationsToDB = (userId: number, stringRecommendation: string): void => {
  try {
    axios
    .post("http://localhost:3001/save", {
      userId: userId,
      stringData: stringRecommendation,
    })
    .then((response) => {
      console.log(response);
    });
  } catch(e) {
    console.log("error saving recommendations", e);
  }
};

// BIG REFACTOR NEEDED IN THIS FILE
// This below should be done by already having access to the DB id from the retrieve and save functions, incorperating the DBid as part of the TRACK/ Recommendation type.
const removeRecommendationFromDb = (userId: number, recToDeleteId: string) => {
  try {
    axios
    .post("http://localhost:3001/retrieve", {
      userId: userId,
    })
    .then((response) => {
      const savedStringRecs = response.data;
      const savedRecs: any = savedStringRecs.map((sRec: any) => {
        const rec = JSON.parse(sRec.data);

        return { data: rec, dbId: sRec.recommendationsId }
      })
      // Result should always be an array of one due to the unique dbId referring to a single row.
      const result = savedRecs.filter((rec: any) => rec.data.id === recToDeleteId);
      axios
      .post("http://localhost:3001/delete", {
        dbId: result[0].dbId,
        userId: userId,
      })
      // Need .then error checking here?
    });
  } catch(e) {
    console.log("error removing recommendations", e);
  }
}

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
    login: {
      userData: {
        userName: "",
        userId: 0,
      },
    }
    // If wanted to serialize functions to store in redux.
    // functions: {
    //   getInfo: getInfoSerialized,
    // }
    // This any should be changed to type Mystro- will require changes...
  } as any,
  reducers: {
    saveRecommendation: (state, action) => {
      // state
      const userId: number = state.login.userData.userId;
      const newRecommendation: TrackObjectFull = {
        ...action.payload
      };
      state.saved.push(newRecommendation);

      // DB- recieves the single new recommendation
      if (userId !== 0) {
        const stringRecommendation = JSON.stringify(action.payload);
        saveRecommendationsToDB(userId, stringRecommendation);
      }
        // Local Storage takes the whole list of saved recommendations
      else {
        const stringData = JSON.stringify(state.saved);
        localStorage.setItem("mystro", stringData);
      }
    },
    removeRecommendation: (state, action) => {
      const userId: number = state.login.userData.userId;
      // if DB remove else LS remove
      if (userId !== 0) {
        const recToDelete = state.saved.filter((rec: any) => rec.id === action.payload.id);

        if (recToDelete) {
          removeRecommendationFromDb(userId, action.payload.id);
        }
      } else {
        const stringData = JSON.stringify(state.saved);
        localStorage.setItem("mystro", stringData);
      }
      // Updating the state/UI whether DB or LS
      state.saved = state.saved.filter((rec: TrackObjectFull) => rec.id !== action.payload.id);
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
    },
    storeLogin: (state, action) => {
      state.login.userData = action.payload.userData;
      // When logging out the state is returned to what it was before login.
      if (action.payload.userData.userId === 0){
        state.saved = getLocalSaved();
      }
    }, 
    setSavedFromDB: (state, action) => {
      state.saved = action.payload.saved;
    },
  }
});

export const { saveRecommendation, removeRecommendation, setPlaying, setDetails, setToken, setGoBack, storePrevious, storeLogin, setSavedFromDB } = mystroSlice.actions;

export default mystroSlice.reducer;