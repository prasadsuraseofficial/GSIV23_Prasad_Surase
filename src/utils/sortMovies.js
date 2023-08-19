const sortMovies = (movies) =>
  movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

export default sortMovies;
