import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import { useDispatch } from "react-redux";
import { getVideoInfo } from "../utils/appSlice";
import { ShimmerCard } from "./ShimmerEffects";

const VideoGrid = ({ videos = [], loading, error }) => {
  const dispatch = useDispatch();

  if (error) {
    return <div className="text-center text-red-600 py-4">{error}</div>;
  }

  if (videos.length === 0 && !loading) {
    return (
      <div className="flex flex-wrap justify-center py-8">
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <ShimmerCard key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center bg-white dark:bg-neutral-950 font-roboto text-black dark:text-white">
      {videos.map((video) => {
        const id = typeof video.id === "object" ? video.id.videoId : video.id;
        return (
          <span onClick={() => dispatch(getVideoInfo(video))} key={id}>
            <Link to={`/watch?v=${id}`}>
              <VideoCard info={video} />
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default VideoGrid;
