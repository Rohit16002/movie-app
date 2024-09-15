import React, { useEffect, useState } from 'react';
import { UPCOMING_MOVIES, IMAGE_URL } from '../utils/constant';
import { useNavigate } from 'react-router-dom';

const UpcomingMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const apiResp = await fetch(UPCOMING_MOVIES);
        const resp = await apiResp.json();
        
        // Extract the `results` array and set it in the state
        setMovies(resp.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApiData();
  }, []);

  // Function to handle click on a movie
  const handleMovieClick = (movie) => {
    navigate(`/SingleMovieDetailPage?name=${encodeURIComponent(movie.title)}`);
  };

  return (
    <div className="p-4 bg-bgColor text-white w-full">
      <div className="flex flex-wrap items-center justify-center gap-20">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div 
              key={movie.id} 
              className="w-48 relative group cursor-pointer" 
              onClick={() => handleMovieClick(movie)} // Redirect on click
            >
              <img 
                src={`${IMAGE_URL}${movie.poster_path}`} 
                alt={movie.title} 
                className="w-full rounded-lg transition-transform transform group-hover:scale-105 duration-300" // Scale effect on hover
              />
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
              <p className="text-sm text-gray-400">Rating: {movie.vote_average.toFixed(1)}</p>
            </div>
          ))
        ) : (
          // At the time of fetching the data
          <p className="h-screen text-center text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingMoviePage;
