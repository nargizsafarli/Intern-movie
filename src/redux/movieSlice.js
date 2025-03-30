import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "c9af5bffc7fbf6380f49a59654d8d26b";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-US&page=${page}`);
      const data = await response.json();
      return { movies: data.results, totalPages: data.total_pages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGenres = createAsyncThunk(
  "movies/fetchGenres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      return data.genres;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    genres: [],
    selectedGenre: "All genres",
    page: 1,
    totalPages: 1,
    status: "idle",
    error: null,
    likedMovies: [],
  },
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.page = 1;
      state.totalPages = 1;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    toggleLikeMovie: (state, action) => {
      const movie = action.payload;
      const exists = state.likedMovies.find((m) => m.id === movie.id);
      if (exists) {
        state.likedMovies = state.likedMovies.filter((m) => m.id !== movie.id);
      } else {
        state.likedMovies.push(movie);
      }
    },
    removeLikedMovie: (state, action) => {
      state.likedMovies = state.likedMovies.filter((m) => m.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = [...state.movies, ...action.payload.movies];
        state.totalPages = action.payload.totalPages;
        state.page += 1;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = [{ id: "All genres", name: "All genres" }, ...action.payload];
      });
  },
});

export const { resetMovies, setSelectedGenre, toggleLikeMovie, removeLikedMovie } = movieSlice.actions;
export default movieSlice.reducer;
