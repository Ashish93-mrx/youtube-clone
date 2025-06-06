import { useEffect, useState } from "react";
import { YOUTUBE_LIVE_VIDEO_API } from "../utils/constants";
import { Link } from "react-router";
import VideoCard from "./VideoCard";
import {ShimmerCard} from "./ShimmerEffects";
import { getVideoInfo } from "../utils/appSlice";
import { useDispatch } from "react-redux";


const Live = () => {
  const dispatch = useDispatch();
  const [trends, setTrends] = useState([]);

  const fetchLive = async () => {
    const response = await fetch(YOUTUBE_LIVE_VIDEO_API);
    const data = await response.json();
    setTrends(data?.items);
  };

  useEffect(() => {
    fetchLive();
  }, []);

  if (trends?.length < 1) {
    return (
      <div className="flex flex-wrap justify-center bg-white text-black dark:bg-neutral-950 dark:text-white">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <span className="p-2 m-2" key={idx}>
              <ShimmerCard />
            </span>
          ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center bg-white text-black dark:bg-neutral-950 dark:text-white">
        {trends.map((video) => {
          const id = typeof video.id === "object" ? video.id.videoId : video.id;

          const url = `/watch?v=${id}`;

          return (
            <Link to={url} key={id} onClick={() => dispatch(getVideoInfo(video))}>
              <VideoCard info={video} key={id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Live;