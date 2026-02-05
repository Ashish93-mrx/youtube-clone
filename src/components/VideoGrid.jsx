import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import VideoCard from "./VideoCard";
import { getVideoInfo } from "../utils/appSlice";
import { ShimmerCard } from "./ShimmerEffects";
import ErrorState from "./ErrorState";

const VideoGrid = ({ videos = [], loading, error, onRetry }) => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white">
      {error ? (
        <ErrorState code={error} onRetry={onRetry} />
      ) : videos.length === 0 && loading ? (
        <div className="flex flex-wrap justify-center py-8">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <ShimmerCard key={i} />
            ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center font-roboto">
          {videos.map((video) => {
            const id =
              typeof video.id === "object" ? video.id.videoId : video.id;

            return (
              <span key={id} onClick={() => dispatch(getVideoInfo(video))}>
                <Link to={`/watch?v=${id}`}>
                  <VideoCard info={video} />
                </Link>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
