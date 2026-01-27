import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { YOUTUBE_TAB_LIST } from "../utils/constants";

const CategoryBar = ({ selectedId, onSelect }) => {
  const [lists, setLists] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const updateArrows = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    const fetchTabs = async () => {
      const res = await fetch(YOUTUBE_TAB_LIST);
      const json = await res.json();
      const modified = [{ id: 0, snippet: { title: "All" } }, ...json.items];
      setLists(modified);
    };
    fetchTabs();
    updateArrows();

    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);

    return () => {
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  return (
    <div className="relative w-full py-3 bg-white text-black dark:bg-neutral-950 dark:text-white overflow-hidden">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-10 bg-white bg-opacity-80 hover:bg-opacity-100 dark:bg-neutral-950 flex items-center justify-center"
        >
          <FaChevronLeft className="text-xl" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-12 scrollbar-none scroll-smooth font-roboto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {lists.map((item) => (
          <Button
            key={item.id}
            name={item.snippet.title}
            isCategoryId={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-white bg-opacity-80 hover:bg-opacity-100 dark:bg-neutral-950 flex items-center justify-center"
        >
          <FaChevronRight className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default CategoryBar;
