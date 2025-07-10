import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { convertLargeNums } from "../utils/helper";
import { getTimeAgo } from "../utils/dateUtils";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;

  return (
    <div className="w-80 m-4">
      <div className="relative">
        <LazyLoadImage
          alt="thumbnail"
          src={thumbnails.medium.url}
          effect="blur"
          className="rounded-xl w-full h-auto"
        />
      </div>

      <div className="mt-2">
        <div className="font-semibold text-sm line-clamp-2">{title}</div>
        <div className="text-sm text-gray-700 dark:text-gray-400">{channelTitle}</div>
        <div className="text-sm text-gray-700 dark:text-gray-400">
          {statistics?.viewCount ? convertLargeNums(statistics.viewCount) : ""} views • {getTimeAgo(publishedAt)}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;