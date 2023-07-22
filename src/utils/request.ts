export const API_KEY = "266e61d5e7785255e90fe40759f47745";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const BASE_URL = "http://image.tmdb.org/t/p/original";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

//https://api.themoviedb.org/3/movie/550?api_key=266e61d5e7785255e90fe40759f47745

//https://api.themoviedb.org/3/trending/all/week?api_key=266e61d5e7785255e90fe40759f47745&language=en-US

export default requests;
