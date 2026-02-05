import { useEffect, useRef, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constants";
import { useSelector } from "react-redux";
import VideoGrid from "./VideoGrid";
import CategoryBar from "./CategoryBar";
import { ShimmerCard } from "./ShimmerEffects";

const VideoContainer = () => {
  const selector = useSelector((state) => state.result.searchRes);
  const [videos, setVideos] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  const getVideos = async (reset = false) => {
    try {
      setError(null);
      let url = YOUTUBE_VIDEO_API;
      if (categoryId) url += `&videoCategoryId=${categoryId}`;
      if (!reset && nextPageToken) url += `&pageToken=${nextPageToken}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json?.error) {
        setError(json.error.code);
        setVideos([]);
        return;
      }

      setVideos((prev) => (reset ? json.items : [...prev, ...json.items]));
      setNextPageToken(json.nextPageToken || null);
    } catch (err) {
      setVideos([]);
      if (!navigator.onLine) {
        setError("NETWORK");
      } else {
        setError(500);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  // Intersection Observer Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPageToken && !loadingMore) {
          setLoadingMore(true);
          getVideos(false);
        }
      },
      { threshold: 1.0 },
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [nextPageToken, loadingMore]);

  // Fetch on mount or when category changes
  useEffect(() => {
    if (selector.length > 0) {
      setVideos(selector);
    } else {
      getVideos(true);
    }
  }, [selector, categoryId]);

  return (
    <div>
      {selector.length === 0 && (
        <CategoryBar
          selectedId={categoryId}
          onSelect={(id) => {
            setCategoryId(id);
            setNextPageToken(null);
            setVideos([]);
          }}
        />
      )}

      <VideoGrid videos={videos} loading={loadingMore} error={error} />

      {loadingMore && (
        <>
          <div ref={bottomRef} className="py-8 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-4">
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <ShimmerCard key={idx} />
                ))}
            </div>
            <div className="w-6 h-6 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoContainer;