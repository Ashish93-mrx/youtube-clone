import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router"; // note: react-router-dom
import { closeMenu } from "../utils/appSlice";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();

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
    <div className="pl-20">
      <iframe
        className="w-full rounded-xl"
        width="2700"
          height="500"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
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
