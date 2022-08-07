import { createSlice } from "@reduxjs/toolkit";

/**
 * Redux Slice
 */
const sortSlice = createSlice({
  name: "sort",
  initialState: {
    byYear: {
      ascend: false,
      descend: false,
    },
    byPopularity: {
      ascend: false,
      descend: false,
    },
    byArtist: {
      ascend: false,
      descend: false,
    },
  } as any,
  reducers: {
    sortByYear: (state, action) => {
      // Note now the state is moving from boolean to string- its currently set up as any...
      if (action.payload === "highToLow") {
        return { ...state, byYear: { ascend: false, descend: !state.byYear.descend } };
      } else if (action.payload === "lowToHigh") {
        return { ...state, byYear: { ascend: !state.byYear.ascend, descend: false } };
      }
    },
    sortByPopularity: (state, action) => {
      if (action.payload === "highToLow") {
        return { ...state, byPopularity: { ascend: false, descend: !state.byPopularity.descend } };
      } else if (action.payload === "lowToHigh") {
        return { ...state, byPopularity: { ascend: !state.byPopularity.ascend, descend: false } };
      }
    },
    sortByArtist: (state, action) => {
      if (action.payload === "highToLow") {
        return { ...state, byArtist: { ascend: false, descend: !state.byArtist.descend } };
      } else if (action.payload === "lowToHigh") {
        return { ...state, byArtist: { ascend: !state.byArtist.ascend, descend: false } };
      }
    },
    clearFilters: (state) => {
      return state = {
        byYear: {
          ascend: false,
          descend: false,
        },
        byPopularity: {
          ascend: false,
          descend: false,
        },
        byArtist: {
          ascend: false,
          descend: false,
        },
      }
    }
  },
});

export const { sortByYear, sortByPopularity, sortByArtist, clearFilters } = sortSlice.actions;

export default sortSlice.reducer;