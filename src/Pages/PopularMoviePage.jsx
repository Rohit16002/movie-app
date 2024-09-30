import React, { useEffect, useState } from "react";
import { URL, IMAGE_URL } from "../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";

const PopularMoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // State for popular movie page
  const [totalPages, setTotalPages] = useState(1); // State for total popular movie pages
  const [searchPage, setSearchPage] = useState(1); // State for search result page
  const [searchTotalPages, setSearchTotalPages] = useState(1); // State for total search result pages
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
            `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&query=${movie_name}&page=${searchPage}`
          );
        } else {
          apiResp = await fetch(`${URL}&page=${page}`); // Fetch popular movies
        }

        const resp = await apiResp.json();

        if (resp.results.length > 0) {
          if (movie_name) {
            setMovies(resp.results);
            setSearchTotalPages(resp.total_pages); // Set total search pages
          } else {
            setMovies(resp.results);
            setTotalPages(resp.total_pages); // Set total popular movie pages
          }
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
  }, [movie_name, page, searchPage]); // Fetch data when movie_name, page, or searchPage changes

  // Reset search page to 1 if movie_name changes
  useEffect(() => {
    setSearchPage(1);
  }, [movie_name]);

  const handleMovieClick = (movie) => {
    navigate(`/SingleMovieDetailPage?name=${encodeURIComponent(movie.title)}`);
  };

  const handleNextPage = () => {
    if (movie_name) {
      if (searchPage < searchTotalPages) {
        setSearchPage(searchPage + 1); // Move to the next page for search results
      }
    } else {
      if (page < totalPages) {
        setPage(page + 1); // Move to the next page for popular movies
      }
    }
  };

  const handlePreviousPage = () => {
    if (movie_name) {
      if (searchPage > 1) {
        setSearchPage(searchPage - 1); // Move to the previous page for search results
      }
    } else {
      if (page > 1) {
        setPage(page - 1); // Move to the previous page for popular movies
      }
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
                    src={
                      movie.poster_path
                        ? `${IMAGE_URL}${movie.poster_path}`
                        : "https://via.placeholder.com/500x750/00000/FFFFFF?text=%20%20%20%20%20Poster%0ANot%20Available&size=100"
                    }
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
              <p className="h-screen text-center text-white">
                No movies found!
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded mr-2"
              disabled={movie_name ? searchPage === 1 : page === 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            <span className="text-white">
              Page {movie_name ? searchPage : page} of{" "}
              {movie_name ? searchTotalPages : totalPages}
            </span>
            <button
              className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
              disabled={
                movie_name
                  ? searchPage === searchTotalPages
                  : page === totalPages
              }
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PopularMoviePage;
