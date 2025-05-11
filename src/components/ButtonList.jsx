// import React, { useEffect, useRef, useState } from 'react';
// import Button from './Button';
// import { YOUTUBE_TAB_LIST } from '../utils/constants';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const ButtonList = ({ onCategorySelect }) => {
//   const [lists, setList] = useState([]);
//   const scrollRef = useRef(null);

//   useEffect(() => {
//     getAllList();
//   }, []);

//   const getAllList = async () => {
//     const data = await fetch(YOUTUBE_TAB_LIST);
//     const res = await data.json();
//     setList(res.items);
//   };

//   const scroll = (scrollOffset) => {
//     scrollRef.current.scrollBy({
//       left: scrollOffset,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <div className="relative flex items-center">
//       {/* Left Arrow */}
//       <button
//         className="absolute left-0 z-10 bg-white p-2 shadow-md rounded-full"
//         onClick={() => scroll(-200)}
//       >
//         <FaChevronLeft />
//       </button>

//       {/* Scrollable Button List */}
//       <div
//         ref={scrollRef}
//         className="flex overflow-x-auto whitespace-nowrap no-scrollbar gap-2 px-10"
//       >
//         <button
//           className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//           onClick={() => onCategorySelect(null)}
//         >
//           All
//         </button>

//         {lists.map((i) => (
//           <Button
//             key={i.id}
//             name={i.snippet.title}
//             onClick={() => onCategorySelect(i.id)}
//           />
//         ))}
//       </div>

//       {/* Right Arrow */}
//       <button
//         className="absolute right-0 z-10 bg-white p-2 shadow-md rounded-full"
//         onClick={() => scroll(200)}
//       >
//         <FaChevronRight />
//       </button>
//     </div>
//   );
// };

// export default ButtonList;

import React, { useRef, useState, useEffect } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import FilterChip from "./FilterChip";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { YOUTUBE_TAB_LIST } from "../utils/constants";

const FilterBar = ({ filters, activeFilter, onFilterChange }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [lists, setList] = useState([]);

  const getLists = async () => {
    const data = await fetch(YOUTUBE_TAB_LIST);
    const json = await data.json();
    setList(json?.items);
  };

  const updateArrows = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    updateArrows();
    getLists();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
    }
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [filters]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex items-center w-full py-3 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 scrollbar-none scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {console.log(lists, "okokokok")}
        {lists.map((i) => (
          <Button
            key={i.id}
            name={i.snippet.title}
            onClick={() => onCategorySelect(i.id)}
          />
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent flex items-center justify-center"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default FilterBar;
