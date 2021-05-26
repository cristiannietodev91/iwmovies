import movies from './movies.json'
// A mock function to mimic making an async request for data
export function loadMovies() {
    return movies;
}

export function getMovieById(idMovie) {
    return movies.find((movie)=>movie.id === idMovie);
}