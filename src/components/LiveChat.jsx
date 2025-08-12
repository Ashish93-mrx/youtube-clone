import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, resetMessage } from "../utils/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utils/helper";
import { TfiClose } from "react-icons/tfi";
import { AiOutlineSend } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa6";

const LiveChat = ({ info }) => {
  const [liveMessage, setLiveMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const dispatch = useDispatch();
  const selector = useSelector((store) => store.chat.message);
  useEffect(() => {
    dispatch(resetMessage());
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(20),
        })
      );
    }, 3000);
    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div
        className={`flex flex-row-reverse items-center h-12 w-[400px] border border-gray-500 rounded-t-xl ${
          showChat ? "" : "rounded-b-xl"
        }`}
      >
        <button
          className="mr-5 cursor-pointer"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? <TfiClose /> : <FaChevronDown />}
        </button>
      </div>
      {showChat && (
        <>
          <div className="w-[400px] h-[400px] p-2 border-r border-l border-gray-500 bg-slate-100  overflow-y-scroll flex flex-col-reverse text-black dark:bg-black dark:text-white">
            <div>
              {
                //don't use index as key
                selector.map((i, index) => (
                  <ChatMessage name={i.name} message={i.message} key={index} />
                ))
              }
            </div>
          </div>
          <span className="flex items-center w-full max-w-md border border-gray-300 bg-white dark:bg-zinc-900 rounded-xl shadow-sm px-3 py-2 space-x-2">
            <MdAccountCircle
              size={30}
              className="text-gray-600 dark:text-gray-300"
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addMessage({ name: "You", message: liveMessage }));
                setLiveMessage("");
              }}
              className="flex items-center w-full space-x-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-grow h-9 px-3 text-sm text-black dark:text-white bg-gray-100 dark:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={liveMessage}
                onChange={(e) => setLiveMessage(e.target.value)}
              />
              <button
                type="submit"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                <AiOutlineSend size={24} />
              </button>
            </form>
          </span>
        </>
      )}
    </>
  );
};

export default LiveChat;

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
