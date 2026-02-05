import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSearchRes } from "../utils/resultSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import ResultVideoCard from "./ResultVideoCard";
import { ResultShimmer } from "./ShimmerEffects";
import { getVideoInfo } from "../utils/appSlice";

function ResultPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search_query");

  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSearch = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        YOUTUBE_SEARCH_API + `&q=${searchQuery}`
      );
      const result = await response.json();

      setVideos(result?.items || []);
      dispatch(addSearchRes(result?.items || []));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getSearch();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-full md:px-6 py-4 bg-white dark:bg-neutral-950 text-black dark:text-white">
      {loading ? (
        <div>
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <ResultShimmer key={idx} />
            ))}
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-6">
            Search Results for: {searchQuery}
          </h1>

          <div className="flex flex-col gap-8">
            {videos.map((video) => (
              <span
                key={video?.id?.videoId}
                onClick={() => dispatch(getVideoInfo(video))}
              >
                <ResultVideoCard video={video} />
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ResultPage;