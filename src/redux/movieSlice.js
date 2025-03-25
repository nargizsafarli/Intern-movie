import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

const API_KEY = "c9af5bffc7fbf6380f49a59654d8d26b";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

export const fetchMovies=createAsyncThunk(
    "movies/fetchMovies",
    async(page,{ rejectWithValue})=>{
        try {
            const response=await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
            const data = await response.json();
            return { movies: data.results, totalPages: data.total_pages };
            
        } catch (error) {
            return rejectWithValue(error.message);
          }
    }
)
const movieSlice = createSlice({
    name: "movies",
    initialState: {
      movies: [],
      page: 1,
      totalPages: 1,
      status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null
    },
    reducers: {
      resetMovies: (state) => {
        state.movies = [];
        state.page = 1;
        state.totalPages = 1;
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchMovies.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.movies = [...state.movies, ...action.payload.movies]; // Mövcud array-ə əlavə edirik
          state.totalPages = action.payload.totalPages;
          state.page += 1; // Növbəti səhifəyə keçirik
        })
        .addCase(fetchMovies.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    }
  });
  
  export const { resetMovies } = movieSlice.actions;
  export default movieSlice.reducer;
