import React, { useEffect, useState, useRef } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router";
import { useSelector } from "react-redux";
// import React, { useRef, useState, useEffect } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import FilterChip from "./FilterChip";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { YOUTUBE_TAB_LIST } from "../utils/constants";
import ShimmerCard from "./ShimmerCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const selector = useSelector((state) => state.result.searchRes);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [lists, setList] = useState([]);
  const [error, setError] = useState(null);

  // const [scrollX, setScrollX] = useState(0);
  // const containerRef = useRef(null);
  // const { trg } = props;
  // const topResList = trg.gridElements.infoWithStyle.restaurants;

  // const CARD_WIDTH = 1000;

  // const handleNext = () => {
  //   const maxScroll = (topResList.length * CARD_WIDTH) - containerRef.current.offsetWidth;
  //   console.log(containerRef)
  //   console.log(containerRef.current.offsetWidth)
  //   setScrollX(prev => Math.min(prev + CARD_WIDTH, maxScroll));
  // };

  // const handlePrev = () => {
  //   setScrollX(prev => Math.max(prev - CARD_WIDTH, 0));
  // };

  useEffect(() => {
    if (selector.length > 0) {
      setVideos(selector);
    } else {
      getVideos();
    }
  }, [selector, categoryId]);

  const getVideos = async (selectedCategoryId = null) => {
    try {
      const finalCategoryId = selectedCategoryId ?? categoryId;
      let url = YOUTUBE_VIDEO_API;
      if (finalCategoryId) {
        url += `&videoCategoryId=${finalCategoryId}`;
      }

      const data = await fetch(url);
      const json = await data.json();

      if (json.error) {
        throw new Error(json.error.message);
      }

      setVideos(json?.items);
      setError(null);
    } catch (error) {
      setError(error.message || "Something went wrong");
      setVideos([]);
      console.error(error);
    }
  };

  const handleCategorySelect = (id) => {
    setCategoryId(id);
  };

  const getLists = async () => {
    const data = await fetch(YOUTUBE_TAB_LIST);
    const json = await data.json();

    const modifiedItems = [
      { id: 0, snippet: { title: "All" } },
      ...(json?.items || []),
    ];

    setList(modifiedItems);
    setError(null);
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
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (videos?.length < 1) {
    return (
      <div className="flex flex-wrap justify-center">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <span className="p-2 m-2" key={idx}>
              <ShimmerCard key={idx} />
            </span>
          ))}
      </div>
    );
  }

  return (
    <div>
      {/* <ButtonList onCategorySelect={handleCategorySelect} /> */}
      <div className="relative flex items-center w-full py-3 border-gray-200 bg-white text-black dark:bg-gray-900 dark:text-white">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 w-12 h-full bg-gradient-to-r from-white to-transparent flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto px-4 scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >

          {lists.map((i) => (
            <Button
              key={i.id}
              name={i.snippet.title}
              onClick={() => handleCategorySelect(i.id)}
            />
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 w-12 h-full bg-gradient-to-l from-white to-transparent flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
      {error && (
        <div className="w-full text-center text-red-600 font-semibold my-4">
          {error}
        </div>
      )}

      <div className="flex flex-wrap justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
        {videos.map((video) => {
          const id = typeof video.id === "object" ? video.id.videoId : video.id;

          const url = `/watch?v=${id}`;

          return (
            <Link to={url} key={id}>
              <VideoCard info={video} />
            </Link>
          );
        })}
      </div>

      <div className="w-full overflow-hidden">
        {/* <div className="flex justify-between items-center mt-5">
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className={`w-9 h-9 flex items-center justify-center rounded-full 
                ${scrollX <= 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-800'}`}
            >
              <FiArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className={`w-9 h-9 flex items-center justify-center rounded-full 
                ${(scrollX + containerRef?.current?.offsetWidth >= topResList.length * CARD_WIDTH)
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-gray-200 text-gray-800'}`}
            >
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 transition-transform duration-500 mt-4"
          style={{ transform: `translateX(-${scrollX}px)` }}
          ref={containerRef}
        >
          {videos.map((video) => {
            const id =
              typeof video.id === 'object'
                ? video.id.videoId
                : video.id;

            const url = `/watch?v=${id}`;

            return (
              <Link to={url} key={id}>
                <VideoCard info={video} />
              </Link>
            );
          })}
        </div> */}

        <hr className="border mt-10" />
      </div>
    </div>
  );
};

export default VideoContainer;