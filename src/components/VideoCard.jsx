import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { convertLargeNums } from "../utils/helper";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 pb-3 m-2 w-80 shadow">
      <LazyLoadImage
        alt="thumbnail"
        src={thumbnails.medium.url}
        effect="blur"
        className="rounded-lg"
      />

      <ul>
        <li className="font-bold py-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </li>
      </ul>

      <span className="flex flex-row justify-between dark:text-gray-300 text-black">
        <div>{channelTitle}</div>
        <div className="font-semibold text-sm">
          {statistics?.viewCount
            ? convertLargeNums(statistics.viewCount) + " views"
            : ""}
        </div>
      </span>
    </div>
  );
};

export default VideoCard;