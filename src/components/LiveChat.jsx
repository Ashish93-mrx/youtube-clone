import { useEffect, useState } from "react"
import ChatMessage from "./ChatMessage"
import { useDispatch, useSelector } from "react-redux";
import {addMessage} from "../utils/chatSlice";
import {generateRandomName,makeRandomMessage} from "../utils/helper";



const LiveChat = ({info}) => {
    const [liveMessage, setLiveMessage] = useState("");
    const dispatch = useDispatch();
    const selector = useSelector((store)=>store.chat.message)
    useEffect(()=>{
        const i = setInterval(()=>{
            dispatch(addMessage({name: generateRandomName(), message:makeRandomMessage(20)}));
        },3000);
        return ()=> clearInterval(i);
    },[]);
  return (<>
    <div className='w-full h-[500px] p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse text-black dark:bg-gray-900 dark:text-white'>
    <div>{
        //don't use index as key
        selector.map((i,index)=>  <ChatMessage
            name={i.name}
            message={i.message}
            key={index} 
        />)
    }
    </div>
    </div>
        <form onSubmit={(e)=>{e.preventDefault();dispatch(addMessage({name:"Ash", message:liveMessage}));setLiveMessage("")}} className="w-full p-2 border border-black">
            <input type="text" className="w-96  text-black dark:bg-gray-900 dark:text-white" value={liveMessage} onChange={(e)=>setLiveMessage(e.target.value)}/>
            <button className="px-2 mx-2 bg-gray-200 dark:bg-gray-700">send</button>
        </form>
        </>
  )
}

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