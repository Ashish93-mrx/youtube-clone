import { useEffect, useState, useRef } from "react";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { addSearchRes, removeSearch } from "../utils/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  YOUTUBE_SEARCH_SUGGESTION_API,
  YOUTUBE_SEARCH_API,
  YT_LOGO,
  ACC_LOGO,
} from "../utils/constants";
import { Link } from "react-router";

import { toggleTheme } from "../utils/themeSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { current } from "@reduxjs/toolkit";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const searchInput = useRef(null);

  const searchCache = useSelector((state) => state.search);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    const timer = setTimeout(() => {
      if (searchQuery.trim() === "") return;

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }

      setShowSuggestions(true);
    }, 200);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  const getSearchResult = async (query) => {
    try {
      setSearchQuery(query);
      const response = await fetch(YOUTUBE_SEARCH_API + `&q=${query}`);
      const result = await response.json();
      dispatch(addSearchRes(result.items));
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const getSearchSuggestions = async () => {
    try {
      const response = await fetch(
        YOUTUBE_SEARCH_SUGGESTION_API + encodeURIComponent(searchQuery)
      );
      const text = await response;
      const data = await text.json();
      setSuggestions(data?.suggestions);
      //update cache
      dispatch(
        cacheResults({
          [searchQuery]: suggestions,
        })
      );
      // Use the suggestions as needed
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // const dispatch = useDispatch();
  const toggleMenuHandle = () => {
    dispatch(toggleMenu());
  };
  return (
    <>
      <div className="sticky p-2 top-0 z-50 bg-white text-black dark:bg-gray-900 dark:text-white">
        <div className="grid grid-flow-col p-2 m-2 shadow-lg">
          <div className="flex col-span-1">
            <span
              onClick={() => toggleMenuHandle()}
              className="mt-4 cursor-pointer"
            >
              <GiHamburgerMenu />
            </span>
            <Link to="/">
              <img
                onClick={() => dispatch(removeSearch())}
                className="hidden md:block md:h-11 md:mx-2 cursor-pointer"
                alt="YT"
                src={YT_LOGO}
              />
            </Link>
          </div>
          <div ref={wrapperRef} className="col-span-10 px-10 relative">
            <div className="flex w-full md:w-2/4">
              <div className="relative w-full">
                <input
                  className="w-full border border-gray-400 p-2 pr-10 rounded-l-full bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  type="text"
                  ref={searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) =>
                    e.target.value.length !== 0 &&
                    e.key === "Enter" &&
                    getSearchResult(e.target.value)
                  }
                />

                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      if (searchInput.current) searchInput.current.value = "";
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                onClick={() =>
                  searchQuery.trim() !== "" &&
                  getSearchResult(searchQuery.trim())
                }
                className="border border-gray-400 px-4 rounded-r-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                🔍
              </button>
            </div>

            <div className="absolute bg-white py-0 pl-5 w-[29rem] rounded shadow-lg  border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600">
              <ul>
                {showSuggestions &&
                  suggestions?.length > 0 &&
                  suggestions.map((item, idx) => (
                    <li
                      onClick={() => {
                        getSearchResult(item);
                        searchInput, (current.value = item);
                      }}
                      key={idx}
                      className="py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Link>{item}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-1 border rounded dark:border-white border-gray-800 "
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
          <div className="hidden md:block md:col-span-1">
            <img alt="usericon" className="h-8" src={ACC_LOGO} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
