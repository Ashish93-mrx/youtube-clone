import {convertLargeNums} from '../utils/helper';

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  
  return (
    <div className="p-2 pb-3 m-2 w-80 shadow">
      <img className="rounded-lg" alt="thumbnail" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold py-1 text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </li>
      </ul>
      <span className="flex flex-row justify-between">
        <div>{channelTitle}</div>
        <div className="font-thin text-sm">{(statistics?.viewCount) ? convertLargeNums(statistics?.viewCount)+" views" : ''}</div>
        </span>
    </div>
  );
};

export default VideoCard;