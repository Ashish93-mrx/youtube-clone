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
        <div className="font-medium text-[16px] text-[#0F0F0F] dark:text-[#F1F1F1] line-clamp-2">{title}</div>
        <div className="text-sm font-normal text-[#606060] dark:text-[#AAAAAA]">{channelTitle}</div>
        <div className="text-sm font-normal text-[#606060] dark:text-[#AAAAAA]">
          {statistics?.viewCount ? convertLargeNums(statistics.viewCount) : ""} views • {getTimeAgo(publishedAt)}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;