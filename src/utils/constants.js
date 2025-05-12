export const GOOGLE_API_KEY = "AIzaSyCQFDaM_j77RtTB26RGIE4YofQN_3SSqfI";

export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_LIVE_VIDEO_API =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=50&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "https://ash-yt-backend-wbxu.vercel.app/suggest?q=om";

export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=" +
  GOOGLE_API_KEY;

export const YOUTUBE_TAB_LIST =
  "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  GOOGLE_API_KEY;

export const OFFSET_LIVE_CHAT = 25;

// https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=IN&maxResults=20&key=AIzaSyCQFDaM_j77RtTB26RGIE4YofQN_3SSqfI
// https://clients1.google.com/complete/search?client=youtube&ds=yt&hl=en&gl=US&q=SEARCH_TERM
