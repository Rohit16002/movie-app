import React, { useEffect, useState } from "react";
import { URL, IMAGE_URL } from "../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";

const PopularMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const navigate = useNavigate();
  const location = useLocation();

  // Extract the movie name from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const movie_name = queryParams.get("name");

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      setError("");
      try {
        let apiResp;

        // Check if there's a search query, fetch based on that, otherwise fetch popular movies
        if (movie_name) {
          apiResp = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&query=${movie_name}`
          );
        } else {
          apiResp = await fetch(`${URL}&page=${page}`); // Fetch data for the current page
        }

        const resp = await apiResp.json();

        if (resp.results.length > 0) {
          setMovies(resp.results);
          setTotalPages(resp.total_pages); // Update total pages from the API response
        } else {
          setError("No movies found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [page, movie_name]); // Re-fetch data when the page or search query changes

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
    <div className="p-4 bg-bgColor text-white w-full">
      {loading ? (
        <p className="h-screen text-center text-white">Loading...</p>
      ) : error ? (
        <p className="h-screen text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-20">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-48 relative group cursor-pointer"
                  onClick={() => handleMovieClick(movie)}
                >
                 
                  <img
                    src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750/00000/FFFFFF?text=%20%20%20%20%20Poster%0ANot%20Available&size=100"} // "https://shorturl.at/m1nNR"
                    alt={movie.title}
                    className="w-full rounded-lg transition-transform transform group-hover:scale-105 duration-300"
                  />

                  <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    Rating: {movie.vote_average.toFixed(1)}
                  </p>
                </div>
              ))
            ) : (
              <p className="h-screen text-center text-white">No movies found</p>
            )}
          </div>

          {!movie_name && ( // Hide pagination if search query is present
            <div className="flex justify-center items-center mt-6">
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded mr-2"
                disabled={page === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <span className="text-white">
                Page {page} of {totalPages}
              </span>
              <button
                className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
                disabled={page === totalPages}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopularMoviePage;
