import { createSlice } from '@reduxjs/toolkit';
import { loadMovies, getMovieById as getMovieByIdApi } from './moviesAPI';

const initialState = {
  queryMovie: '',
  listMovies: loadMovies(),
  movieDetail: {}
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initMovies: (state, action) =>{
      return {
        ...state,
        listMovies: action.payload
      }
    },
    updateLastSearch: (state, action) =>{
      return {
        ...state,
        queryMovie: action.payload
      }
    },
    setMovieSelected: (state,action) =>{
      return {
        ...state,
        movieDetail: action.payload
      }
    }
  }
});

export const { addMovie, initMovies, updateLastSearch, setMovieSelected } = moviesSlice.actions;

export const selectQuerySearchMovie = (state) => state?.movies.queryMovie;

export const selectMovieDetail = (state) => state?.movies.movieDetail;

export const topMovies = (state) => {
  return state.movies.listMovies?.slice(0,8)
};

//TODO: Reduce genres
export const listGenres = (state) => {
  return [];
};

export const loadMoviesFromAPI = () => (dispatch) => {
  const response = loadMovies();
  dispatch(initMovies(response));  
};

export const getMovieById = (idMovie) => (dispatch) => {
  const response = getMovieByIdApi(idMovie);
  dispatch(setMovieSelected(response));  
};

export const filterMoviesByName = (moviename) => (dispatch) => {
  dispatch(updateLastSearch(moviename));  
  const movies = loadMovies();
  const filterMovies = movies.filter((movie)=> movie.title.toLowerCase().includes(moviename))
  dispatch(initMovies(filterMovies));  
};

export default moviesSlice.reducer;
