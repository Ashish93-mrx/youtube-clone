import { convertLargeNums } from "../utils/helper";

const SuggestedVideoCard = ({ data }) => {
  const { snippet, statistics } = data;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="flex w-full max-w-sm gap-3 mb-4 cursor-pointer">
      <img
        src={thumbnails?.medium?.url}
        alt="video thumbnail"
        className="w-40 h-24 rounded-lg object-cover"
      />

      <div className="flex flex-col justify-between w-full">
        <p className="text-sm font-medium line-clamp-2 text-black dark:text-white">
          {title}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {channelTitle}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {statistics?.viewCount
            ? convertLargeNums(statistics?.viewCount) + " views"
            : ""}
        </p>
      </div>
    </div>
  );
};

export default SuggestedVideoCard;
