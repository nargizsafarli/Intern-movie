import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../../redux/movieSlice';

function Movie() {
  const dispatch=useDispatch();
  const {movies,page,totalPages,status}=useSelector((store)=>store.movies)
  console.log(movies);

useEffect(()=>{
  dispatch(fetchMovies(1))
},[dispatch])

 
  return (
    <div>
      <h2>Popular Movies</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} style={{width:"200px",height:"200px"}} />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {status === "loading" && <p>Loading...</p>}
      {page <= totalPages && (
        <button onClick={() => dispatch(fetchMovies(page))} disabled={status === "loading"}>
          {status === "loading" ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  )
}

export default Movie