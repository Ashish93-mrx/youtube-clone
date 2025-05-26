import { Link } from "react-router-dom";
import { convertLargeNums } from "../utils/helper";

const ResultVideoCard = ({ video }) => {
  const { statistics } = video;
  return (
    <div
      key={video?.id?.videoId}
      className="flex flex-col md:flex-row md:gap-6 max-w-7xl w-full md:ml-32 text-black dark:text-white"
    >
      <Link
        to={`/watch?v=${video?.id?.videoId}`}
        className="w-full md:w-[500px] h-[280px] shrink-0 rounded-xl overflow-hidden"
      >
        <img
          src={
            video?.snippet?.thumbnails?.high?.url ||
            video?.snippet?.thumbnails?.medium?.url
          }
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </Link>

      <div className="flex flex-col justify-start w-full">
        <Link to={`/watch?v=${video?.id?.videoId}`}>
          <h2 className="text-xl font-semibold line-clamp-2 hover:underline">
            {video?.snippet?.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 md:mt-2">
            {video?.snippet?.channelTitle}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
            {statistics?.viewCount
              ? convertLargeNums(statistics?.viewCount) + " views"
              : ""}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {video?.snippet?.description}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ResultVideoCard;
