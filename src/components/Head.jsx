import React, { useEffect, useState, useRef } from "react";
import { toggleMenu } from "../utils/appSlice";
import { cacheResults } from "../utils/searchSlice";
import { addSearchRes } from "../utils/resultSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  YOUTUBE_SEARCH_SUGGESTION_API,
  YOUTUBE_SEARCH_API,
} from "../utils/constants";
import { Link } from "react-router";
import { toggleTheme } from "../utils/themeSlice";
import { GiHamburgerMenu } from "react-icons/gi";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

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
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  const getSearchResult = async (query) => {
    try {
      console.log("in");
      console.log(YOUTUBE_SEARCH_API + `&q=${query}`);
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
      //  await fetch(
      //   `${encodeURIComponent("hii")}`
      // );
      const text = await response.text();
      const json = await JSON.parse(
        text.substring(text.indexOf("["), text.lastIndexOf("]") + 1)
      );
      const suggestions = await json[1].map((item) => item[0]);
      setSuggestions(suggestions);
      //update cache
      dispatch(
        cacheResults({
          [searchQuery]: suggestions,
        })
      );
      // console.log(suggestions,"koko");
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
            {/* <img 
        
        alt="menu" 
        src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
      /> */}
            <Link>
              <img
                className="h-11 mx-2 cursor-pointer"
                alt="YT"
                src="https://www.logoquake.com/uploadfile/2024/0616/youtube-2017-logoquake_b250aa.png"
              />
            </Link>
          </div>
          <div ref={wrapperRef} className="col-span-10 px-10 relative">
            <div>
              <input
                className="w-2/4 border border-gray-400 p-2 rounded-l-full bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={(e) => setShowSuggestions(true)}
                onMouseDown={(e) => setShowSuggestions(false)}
                onKeyDown={(e) =>
                  e.target.value != "" &&
                  e.key === "Enter" &&
                  getSearchResult(e.target.value)
                }
              />
              <button className="bg-gray-400 border border-gray-400 p-2 rounded-r-full dark:bg-gray-600 dark:border-gray-600">
                🔎
              </button>
            </div>

            <div className="absolute bg-white py-0 pl-5 w-[29rem] rounded shadow-lg  border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600">
              <ul>
                {showSuggestions &&
                  suggestions.length > 0 &&
                  suggestions.map((item, idx) => (
                    <li
                      onClick={() => getSearchResult(item)}
                      key={idx}
                      className="py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Link>{item}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            {/* )} */}
          </div>
          <div className="col-span-1">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-1 border rounded dark:border-white border-gray-800 "
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
          <div className="col-span-1">
            <img
              alt="usericon"
              className="h-8"
              src="https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Head;
