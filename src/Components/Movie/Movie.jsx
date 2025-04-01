import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchGenres, setSelectedGenre, toggleLikeMovie } from '../../redux/movieSlice';
import { Select, Input, Modal } from 'antd';
import { AudioOutlined, EyeOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import "./Movie.css";

function Movie() {

  const { Search } = Input;
  const suffix = (
    <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const dispatch = useDispatch();
  const { movies, page, totalPages, status, genres, selectedGenre, likedMovies } = useSelector((store) => store.movies);

  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies(1));
    }
    if (!genres.length) {
      dispatch(fetchGenres());
    }
  }, [dispatch, movies, genres]);
  

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredResults([]);
    } else {
      const results = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [searchTerm, movies]);

  const handleChange = (genreId) => {
    dispatch(setSelectedGenre(genreId));
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDetail = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleLike = (movie) => {
    dispatch(toggleLikeMovie(movie));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const moviesToDisplay = searchTerm
    ? filteredResults
    : (selectedGenre === "All genres"
      ? movies
      : movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)))
    );

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
        <p>Search movie</p>
          <Search
            placeholder="input search text"
            onChange={handleSearch}
            value={searchTerm}
            style={{ width: 200 }}
          />
        </div>
      </div>

      <div className="movie-grid">
        {moviesToDisplay.length > 0 ? (
          moviesToDisplay.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className="movie-overlay">
                <div className="icons">
                  <EyeOutlined className="icon" onClick={() => handleDetail(movie)} />
                  {likedMovies.find((m) => m.id === movie.id) ? (
                    <HeartFilled className="icon" onClick={() => handleLike(movie)} style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined className="icon" onClick={() => handleLike(movie)} />
                  )}
                </div>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">Name: {movie.title}</h3>
                <p className="movie-genre">{getGenreNames(movie.genre_ids)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-movies-message">No movie found matching your search...</p>
        )}
      </div>

      {status === "loading" && <p style={{ display: "flex", margin: "0 auto" }}>Loading...</p>}
      {moviesToDisplay.length > 0 && page <= totalPages && (
        <button className='loading-button' onClick={() => dispatch(fetchMovies(page))} disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Load More"}
        </button>
      )}

      {selectedMovie && (
        <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} style={{ width: "90%", height: "300px" }} />
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Rating: {selectedMovie.vote_average}</p>
        </Modal>
      )}
    </div>
  );
}

export default Movie;

