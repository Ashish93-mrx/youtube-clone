import { useEffect, useState, useRef, useCallback } from "react";
import { YOUTUBE_VIDEO_API, YOUTUBE_TAB_LIST } from "../utils/constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import Button from "./Button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ShimmerCard } from "./ShimmerEffects";
import { getVideoInfo } from "../utils/appSlice";
import { useDispatch } from "react-redux";

// Throttle function
const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
};

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lists, setList] = useState([]);
  const [error, setError] = useState(null);

  const selector = useSelector((state) => state.result.searchRes);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const videoInfo = useDispatch();

  // Fetch videos (initial & pagination)
  const getVideos = async (reset = false) => {
    try {
      let url = YOUTUBE_VIDEO_API;
      if (categoryId) {
        url += `&videoCategoryId=${categoryId}`;
      }
      if (!reset && nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json.error) throw new Error(json.error.message);

      setVideos((prev) => (reset ? json.items : [...prev, ...json.items]));
      setNextPageToken(json.nextPageToken || null);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setVideos([]);
    } finally {
      setLoadingMore(false);
    }
  };

  // Fetch categories (tabs)
  const getLists = async () => {
    const res = await fetch(YOUTUBE_TAB_LIST);
    const json = await res.json();
    const modified = [{ id: 0, snippet: { title: "All" } }, ...json.items];
    setList(modified);
  };

  // 🖱️ Handle infinite scroll
  const handleScroll = useCallback(
    throttle(() => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (nearBottom && !loadingMore && nextPageToken) {
        setLoadingMore(true);
        getVideos(false);
      }
    }, 200),
    [loadingMore, nextPageToken]
  );

  useEffect(() => {
    if (selector.length > 0) {
      setVideos(selector);
    } else {
      getVideos(true);
    }
  }, [selector, categoryId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleCategorySelect = (id) => {
    setCategoryId(id === 0 ? null : id);
    setNextPageToken(null);
    setVideos([]);
  };

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
    getLists();
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
    <div>
      {selector.length == 0 && (
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
            className="flex gap-3 overflow-x-auto px-12 scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {lists.map((i) => (
              <Button
                key={i.id}
                name={i.snippet.title}
                isCategoryId={i.id == categoryId}
                onClick={() => handleCategorySelect(i.id)}
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
      )}
      {error && (
        <div className="h-screen dark:bg-neutral-950 text-center text-red-600 font-semibold">
          {error}
        </div>
      )}
      {!error && videos.length < 1 ? (
        <div className="flex flex-wrap justify-center bg-white dark:bg-neutral-950 text-black dark:text-white">
          {Array(12)
            .fill(null)
            .map((_, idx) => (
              <div key={idx}>
                <ShimmerCard />
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center bg-white dark:bg-neutral-950 text-black dark:text-white">
          {videos.map((video) => {
            const id =
              typeof video.id === "object" ? video.id.videoId : video.id;
            return (
              <span
                onClick={() => {
                  videoInfo(getVideoInfo(video));
                }}
                key={id}
              >
                <Link to={`/watch?v=${id}`} key={id}>
                  <VideoCard info={video} key={id} />
                </Link>
              </span>
            );
          })}
        </div>
      )}
      {loadingMore && (
        <div className="flex flex-wrap justify-center bg-white dark:bg-neutral-950 text-black dark:text-white p-">
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <span key={idx}>
                <ShimmerCard />
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
