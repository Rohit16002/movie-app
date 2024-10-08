import React, { useEffect, useState } from "react";
import { TOP_RATED_URL, IMAGE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const HighRatedPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const apiResp = await fetch(`${TOP_RATED_URL}&page=${page}`); // Fetch data for the current page
        const resp = await apiResp.json();
        setMovies(resp.results);
        setTotalPages(resp.total_pages); // Update total pages from the API response
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchApiData();
  }, [page]); // Re-fetch data when the page changes

  const handleMovieClick = (movie) => {
    navigate(`/SingleMovieDetailPage?name=${encodeURIComponent(movie.title)}`);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Move to the next page
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1); // Move to the previous page
    }
  };

  return (
    <div className="bg-bgColor text-white w-full p-4">
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
              <p className="text-sm text-gray-400">
                Rating: {movie.vote_average.toFixed(1)}
              </p>
            </div>
          ))
        ) : (
          <p className="h-screen text-center text-white">Loading...</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded mr-4"
          disabled={page === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded ml-4"
          disabled={page === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HighRatedPage;
