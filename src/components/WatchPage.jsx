import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router"; // note: react-router-dom
import { closeMenu } from "../utils/appSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import {convertLargeNums} from '../utils/helper';
import { HiDownload } from "react-icons/hi";


const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [expanded, setExpanded] = useState(false);
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const videoInfo = useSelector((state)=>state.app.videoInfo);

  const [chatMessages, setChatMessages] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  useEffect(() => {
    // if (!videoId) return;
    // let isMounted = true;
    // const aborter = new AbortController();
    // // onMessages will be called with each batch of new messages
    // const onMessages = (newItems) => {
    //   if (!isMounted) return;
    //   setChatMessages((prev) => [...prev, ...newItems]);
    // };
    // fetchLiveChat(videoId, GOOGLE_API_KEY, onMessages, aborter.signal)
    //   .catch((err) => console.error('LiveChat error:', err));
    // return () => {
    //   isMounted = false;
    //   aborter.abort();
    // };
  }, [videoId]);

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white text-black dark:bg-gray-900 dark:text-white p-4">
  <div className="w-full lg:w-2/3 flex flex-col gap-4">
    <div className="md:pl-20">
      <iframe
        className="w-full rounded-xl h-[200px] w-200px md:w-2700px md:h-[500px]"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      <div className="w-full rounded-lg w-200px h-auto md:w-2700px">
        <h1 className="font-serif text-2xl py-3">{videoInfo?.snippet?.title}</h1>
        <span className="flex flex-wrap items-center justify-between">
        <span className="flex items-center gap-2">
          <MdAccountCircle size={35}/>
          {videoInfo?.snippet?.channelTitle}
          <p className="h-9 w-24 rounded-3xl text-white bg-black dark:bg-white dark:text-black text-center flex items-center justify-center">
  Subscribe
</p>

        </span>
        <span className="flex items-center pt-2 md:p-0 gap-2">
          <span className="flex flex-row bg-gray-500 h-8 rounded-2xl items-center justify-around">
            <button className="px-3 flex"><AiOutlineLike size={20}/>{convertLargeNums(videoInfo?.statistics?.likeCount)}</button> 
            |
            <button className="px-3 flex">
            <AiOutlineDislike size={20}/>
            </button>
          </span>
          <div className="bg-gray-500 h-8 rounded-2xl flex items-center px-3">
            <IoIosShareAlt/>share
          </div>
          <div className="bg-gray-500 h-8 rounded-2xl flex items-center px-6">
            <HiDownload/>Download
          </div>
        </span>
        </span>
      </div>

      <div className="dark:bg-gray-700 bg-gray-300 rounded-lg mt-2 p-2">
        <span>
          <h1 className="font-bold">{convertLargeNums(videoInfo?.statistics?.viewCount)+" "}{videoInfo?.snippet?.publishedAt.substring(0,10)}</h1>
          <p className={`text-sm whitespace-pre-line ${expanded ? "" : "line-clamp-3"}`}>{videoInfo?.snippet?.description}</p>
          {videoInfo?.snippet?.description?.length>150 &&
           <button onClick={()=>setExpanded(!expanded)}>
            {  expanded ? 'see less' : 'see more'}
          </button>}
        </span>
      </div>
    </div>

    <CommentsContainer videoId={videoId} />
  </div>

  <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:pl-6">
    {temp && <LiveChat info={temp} messages={chatMessages} />}
  </div>
</div>

  );
};

export default WatchPage;

/**
 * Polls the YouTube LiveChat API continuously.
 *
 * @param {string} videoId
 * @param {string} apiKey
 * @param {(items: any[]) => void} onMessages
 * @param {AbortSignal} [signal]
 */
// async function fetchLiveChat(videoId, apiKey, onMessages, signal) {
//   const vidRes = await fetch(
//     `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${videoId}&key=${apiKey}`,
//     { signal }
//   );
//   const vidJson = await vidRes.json();
//   const liveChatId = vidJson.items?.[0]?.liveStreamingDetails?.activeLiveChatId;
//   if (!liveChatId) {
//     throw new Error('This video is not live or no chat available');
//   }

//   let pageToken = '';
//   while (!signal?.aborted) {
//     const url = new URL('https://www.googleapis.com/youtube/v3/liveChat/messages');
//     url.search = new URLSearchParams({
//       liveChatId,
//       part: 'snippet,authorDetails',
//       maxResults: '2000',
//       pageToken,
//       key: apiKey,
//     });

//     const res = await fetch(url, { signal });
//     if (!res.ok) throw new Error(`Chat fetch failed: ${res.statusText}`);
//     const json = await res.json();

//     // deliver messages
//     onMessages(json.items || []);

//     // prepare for next poll
//     pageToken = json.nextPageToken || '';
//     setTemp(await new Promise((r) => setTimeout(r, json.pollingIntervalMillis || 5000)));
//   }
// }
