import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: {},
  loading: false,
  error: null,
  defaultSectionsRequested: false,
  page: 0,
  size: 10,
  selectedMovie: {},
  contactDetails: {
    mobileNo: "",
    emailId: "",
  },
};

export const fetchMovieSections = createAsyncThunk(
  "movie/fetchMovieSections",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8082/movies/sections?page=${page}&size=${size}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setContactDetails: (state, action) => {
      state.contactDetails = action.payload;
    },
    updatePayloadFields: (state, action) => {
      state.payload = { ...state.payload, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieSections.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.defaultSectionsRequested = true;
      })
      .addCase(fetchMovieSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload || {};
      })
      .addCase(fetchMovieSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to fetch movies";
      });
  },
});

export const {
  setPage,
  setSize,
  setSelectedMovie,
  updatePayloadFields,
  setContactDetails,
} = movieSlice.actions;

export const getMovieSections = (state) => state?.movie?.sections;
export const getMovieLoading = (state) => state?.movie?.loading;
export const getMovieError = (state) => state?.movie?.error;
export const getDefaultSectionsRequested = (state) =>
  state?.movie?.defaultSectionsRequested;
export const getPage = (state) => state?.movie?.page;
export const getSize = (state) => state?.movie?.size;
export const getSelectedMovie = (state) => state?.movie?.selectedMovie;
export const getContactDetails = (state) => state?.movie?.contactDetails;

export default movieSlice.reducer;
