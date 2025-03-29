
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchGenres, setSelectedGenre } from '../../redux/movieSlice';
import { Select } from 'antd';

function Movie() {
  const dispatch = useDispatch();
  const { movies, page, totalPages, status, genres, selectedGenre } = useSelector((store) => store.movies);
   console.log(genres,"genres");
   console.log(movies,"movie");

  useEffect(() => {
    dispatch(fetchMovies(1)); // Filmləri çəkirik
    dispatch(fetchGenres()); // Janrları çəkirik
  }, [dispatch]);

  // 🟢 Janr seçimi zamanı işləyən funksiya
  const handleChange = (genreId) => {
    dispatch(setSelectedGenre(genreId));
  };

  // 🔧 Filmin janrlarını ID-dən adlara çevirən funksiya
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  // 🔥 Filtrlənmiş filmləri göstərmək
  const filteredMovies =
    selectedGenre === "All genres"
      ? movies
      : movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)));

  return (
    <div>
      <div>
        <p>Filter by Genre</p>
        <Select
          value={selectedGenre}
          style={{ width: 200 }}
          onChange={handleChange}
          options={genres.map((genre) => ({
            value: genre.id,
            label: genre.name,
          }))}
        />
      </div>

      <h2>Popular Movies</h2>
      <div className="movie-grid">
      {filteredMovies.length > 0 ? (
      filteredMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ width: "200px", height: "300px" }}
          />
          <h3>{movie.title}</h3>
          <p>{getGenreNames(movie.genre_ids)}</p>
        </div>
      ))
    ) : (
      <p>Belə bir film yoxdur</p> // 🟢 Boş olanda göstərir
    )}
      </div>

      {status === "loading" && <p>Loading...</p>}
      {page <= totalPages && (
        <button onClick={() => dispatch(fetchMovies(page))} disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default Movie;
