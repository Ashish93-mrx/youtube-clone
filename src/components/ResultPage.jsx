import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addSearchRes } from "../utils/resultSlice";
import { useDispatch } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import ResultVideoCard from "./ResultVideoCard";
import { ResultShimmer } from "./ShimmerEffects";
import { getVideoInfo } from "../utils/appSlice";

// const dispatch = useDispatch();

function ResultPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search_query");
  const dispatch = useDispatch();
  const videoInfo = useDispatch();
  const [videos, setVideos] = useState([]);

  const getSearch = async () => {
    try {
      // setSearchQuery(query);
      const response = await fetch(YOUTUBE_SEARCH_API + `&q=${searchQuery}`);
      const result = await response.json();
      const allVideos = await result?.items;
      setVideos(allVideos);
      dispatch(addSearchRes(result?.items));
      console.log(result);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [searchQuery]);

  if (videos?.length < 2) {
    return (
      <div className="w-full h-full md:px-6 py-4 bg-white dark:bg-neutral-950">
        {Array(4)
          .fill(null)
          .map(i => <ResultShimmer />
          )}
      </div>
    );
  }

  return (
    <div className="w-full h-full md:px-6 py-4 bg-white dark:bg-neutral-950">
      <h1 className="text-2xl font-semibold mb-6 text-black dark:text-white">
        Search Results for: {searchQuery}
      </h1>

      <div className="flex flex-col gap-8">
        {videos?.length > 0 &&
          videos.map((video, idx) => (
            <span
              onClick={() => {
                videoInfo(getVideoInfo(video));
              }}
              key={idx}
            >
              <ResultVideoCard key={video?.id?.videoId} video={video} />
            </span>
          ))}
      </div>
    </div>
  );
}

export default ResultPage;
