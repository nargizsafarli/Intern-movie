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

  const dispatch = useDispatch();
  const { movies, page, totalPages, status, genres, selectedGenre, likedMovies } = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch(fetchMovies(1));
    dispatch(fetchGenres());
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
          <Search placeholder="input search text" onSearch={() => {}} style={{ width: 200 }} />
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
                  <EyeOutlined className="icon" onClick={() => handleDetail(movie)} />
                  {likedMovies.find((m) => m.id === movie.id) ? (
                    <HeartFilled
                      className="icon"
                      onClick={() => handleLike(movie)}
                      style={{ color: 'red' }}
                    />
                  ) : (
                    <HeartOutlined className="icon" onClick={() => handleLike(movie)} />
                  )}
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

      {selectedMovie && (
        <Modal open={isModalOpen} onCancel={closeModal} footer={null}>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} style={{ width: "90%" ,height:"300px"}} />
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

