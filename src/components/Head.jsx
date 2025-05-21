import { useEffect, useState, useRef } from "react";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { addSearchRes, removeSearch } from "../utils/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  YOUTUBE_SEARCH_SUGGESTION_API,
  YOUTUBE_SEARCH_API,
  ACC_LOGO,
} from "../utils/constants";
import { Link } from "react-router";

import { toggleTheme } from "../utils/themeSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { current } from "@reduxjs/toolkit";
import { MdOutlineLightMode,MdDarkMode } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import ytLogoLight from '../assets/ytLogo.png'
import ytLogoDark from '../assets/ytLogo-dark.png'

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
      //       const text = await response.text();
      // const json = await JSON.parse(
      //   text.substring(text.indexOf("["), text.lastIndexOf("]") + 1)
      // );
      // const suggestions = await json[1].map((item) => item[0]);
      // setSuggestions(suggestions);
      //update cache
      dispatch(
        cacheResults({
          [searchQuery]: data?.suggestions,
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
        <div className="grid grid-flow-col p-2 shadow-lg sticky top-0 z-50 bg-white text-black dark:bg-neutral-950 dark:text-white">
          <div className="flex items-center col-span-1">
            <span
              onClick={() => toggleMenuHandle()}
              className="px-2 cursor-pointer"
            >
              <RxHamburgerMenu size={25} />
            </span>
            <Link to="/">
              {(darkMode) ? (<img
                onClick={() => dispatch(removeSearch())}
                className="hidden md:block md:mx-3 md:w-24 pl-2 cursor-pointer"
                alt="YT"
                src={ytLogoDark}
              />) :
              (<img
                onClick={() => dispatch(removeSearch())}
                className="hidden md:block md:h-6 md:mx-2 md:w-32 cursor-pointer"
                alt="YT"
                src={ytLogoLight}
              />)}
            </Link>
          </div>
          <div ref={wrapperRef} className="col-span-10 px-10 relative">
            <div className="flex w-full md:w-2/4">
              <div className="relative w-full">
                <input
                  placeholder="Search"
                  className="w-full border hover:border-blue-600 p-2 pr-10 rounded-l-full bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600 "
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
                <CiSearch/>
              </button>
            </div>

            <div className="absolute bg-white py-0 pl-5 w-[26rem] rounded shadow-lg  border-gray-100 dark:bg-slate-900 dark:text-white dark:border-gray-900">
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
              className="px-3 py-1  rounded dark:border-white border-gray-800 "
            >
              {darkMode ? <MdOutlineLightMode size={30}/> : <MdDarkMode size={30}/>}
            </button>
          </div>
          <div className="hidden md:block md:col-span-1">
            <img alt="usericon" className="h-8" src={ACC_LOGO} />
          </div>
        </div>
    </>
  );
};

export default Head;
