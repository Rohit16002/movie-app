import React, { useEffect, useState } from "react";
import { IMAGE_URL } from "../utils/constant";
import { useLocation } from "react-router-dom";

const SingleMovieDetailPage = () => {
  const location = useLocation();

  // Extract the movie name from the query parameter
  const queryParams = new URLSearchParams(location.search);
  const movie_name = queryParams.get("name");

  const [movie_id, setMovieId] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movie ID
  useEffect(() => {
    const fetchMovieId = async () => {
      setError(""); // Reset error before fetching
      setLoading(true); // Start loading when fetching starts
      setMovieDetails(null); // Clear previous movie details

      try {
        const movieIdResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&query=${movie_name}`
        );
        const movieIdData = await movieIdResponse.json();

        if (movieIdData.results.length > 0) {
          setMovieId(movieIdData.results[0].id);
        } else {
          setError("Movie not found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching movie id:", error);
        setError("Movie not found");
        setLoading(false);
      }
    };

    if (movie_name) {
      fetchMovieId();
    }
  }, [movie_name]);

  // Fetch movie details and cast after getting the movie ID
  useEffect(() => {
    if (!movie_id) return;

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const movieData = await movieResponse.json();
        setMovieDetails(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Movie not found");
        setLoading(false);
      }
    };

    const fetchCastDetails = async () => {
      try {
        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`
        );
        const castData = await castResponse.json();
        setCast(castData.cast.slice(0, 5)); // Adjust the number of cast members shown
      } catch (error) {
        console.error("Error fetching cast details:", error);
      }
    };

    fetchMovieDetails();
    fetchCastDetails();
  }, [movie_id]);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-lg">{error}</div>;

  return (
    <div className="w-full min-h-screen bg-bgColor text-white px-8 py-5">
      {/* Movie Details Section */}
      {movieDetails && (
        <div className="max-w-7xl mx-auto rounded-lg shadow-lg p-3 mb-6">
          <div className="flex items-start space-x-8">
            {/* Poster Image */}
            <img
              src={`${IMAGE_URL}${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="w-40 h-52 rounded-lg shadow-xl border border-gray-700"
            />

            <div className="text-left w-full">
              <h1 className="text-4xl font-bold mb-1 text-gray-200">
                {movieDetails.title}
              </h1>
              <div className="text-md space-y-2 mb-4">
                <p className="text-blue-300 text-xl">
                  Rating: {movieDetails.vote_average}
                </p>
                <p className="pt-4">
                  {" "}
                  <span className="p-1 text-gray-300 border-2 border-gray-600 rounded-md text-lg">
                    {movieDetails.runtime} min
                  </span>{" "}
                  <span className="text-blue-300 mx-2">
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </span>
                </p>
                <p className="pt-2 text-gray-300 text-lg">
                  Release Date:{" "}
                  {new Date(movieDetails.release_date).toDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-semibold text-gray-100 mb-2">
              Overview
            </h3>
            <p className="text-md text-gray-300 leading-relaxed">
              {movieDetails.overview}
            </p>
          </div>
        </div>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="max-w-7xl mx-auto rounded-lg">
          <h2 className="text-4xl font-semibold text-gray-200">Cast</h2>
          <div className="grid grid-cols-1 md:grid-cols-5">
            {cast.map((actor) => (
              <div
                key={actor.cast_id}
                className="flex flex-col items-center p-4"
              >
                <img
                  src={`${IMAGE_URL}${actor.profile_path}`}
                  alt={actor.name}
                  className="w-40 h-auto object-cover mb-4 rounded"
                />
                <p className="text-lg font-semibold text-center text-gray-200">
                  {actor.name}
                </p>
                <p className="text-sm text-gray-400 text-center">
                  Character: {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleMovieDetailPage;
