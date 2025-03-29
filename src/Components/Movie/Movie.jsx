
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchGenres, setSelectedGenre } from '../../redux/movieSlice';
import { Select, Input } from 'antd';
import { AudioOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import "./Movie.css"

function Movie() {

  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch = (value, _e, info) =>
    console.log(info === null || info === void 0 ? void 0 : info.source, value);

  const dispatch = useDispatch();
  const { movies, page, totalPages, status, genres, selectedGenre } = useSelector((store) => store.movies);
   console.log(genres,"genres");
   console.log(movies,"movie");

  useEffect(() => {
    dispatch(fetchMovies(1)); // Filmləri çəkirik
    dispatch(fetchGenres()); // Janrları çəkirik
  }, [dispatch]);

  const handleChange = (genreId) => {
    dispatch(setSelectedGenre(genreId));
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const filteredMovies =
    selectedGenre === "All genres"
      ? movies
      : movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)));

  const handleDetail = (movieId) => {
    console.log("Detail for movie ID:", movieId);
  };

  const handleLike = (movieId) => {
    console.log("Liked movie ID:", movieId);
  };

  return (
    <div className='movie-container'>
    <div className='functional-div'>
    <div className='filter-div'>
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
      <div className='search-div'>
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      </div>
    </div>

      <div className="movie-grid">
      {filteredMovies.length > 0 ? (
      filteredMovies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-overlay">
            <div className="icons">
              <EyeOutlined className="icon" onClick={() => handleDetail(movie.id)} />
              <HeartOutlined className="icon" onClick={() => handleLike(movie.id)} />
            </div>
          </div>
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{getGenreNames(movie.genre_ids)}</p>
        </div>
      ))
    ) : (
      <p>Belə bir film yoxdur</p>
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
