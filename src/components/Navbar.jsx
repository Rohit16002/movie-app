import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(
        // `/SingleMovieDetailPage?name=${encodeURIComponent(searchQuery)}`
        `/?name=${encodeURIComponent(searchQuery)}`
        // `/PopularMoviePage`
      );
      setSearchQuery("");
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  // Toggle menu on icon click
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-14 items-center justify-around bg-navColor text-txtColor">
      <div className="right font-bold text-white">
        <Link to="/">
          <h3 className="hover:text-red-500">MovieDb</h3>
        </Link>
      </div>
      <div className="left flex items-center">
        <ul className="hidden sm:flex justify-center gap-4">
          <li>
            <Link className="hover:text-white" to="/">
              Popular
            </Link>
          </li>
          <li>
            <Link className="hover:text-white" to="/HighRatedPage">
              Top Rated
            </Link>
          </li>
          <li>
            <Link className="hover:text-white" to="/UpcomingMoviePage">
              Upcoming
            </Link>
          </li>
        </ul>

        <div className="sm:hidden">
          <FaBars
            className="text-white text-2xl cursor-pointer hover:text-red-500"
            onClick={toggleMenu}
          />
        </div>

        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-navColor text-white z-10">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li>
                <Link className="hover:text-white" to="/" onClick={toggleMenu}>
                  Popular
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white"
                  to="/HighRatedPage"
                  onClick={toggleMenu}
                >
                  Top Rated
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white"
                  to="/UpcomingMoviePage"
                  onClick={toggleMenu}
                >
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="ml-4 flex items-center">
          <input
            className="focus:outline-none p-1 rounded text-gray-700"
            type="text"
            placeholder="Movie Name"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            className="ml-2 px-3 py-1 bg-btnColor text-white rounded hover:text-red-500"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
