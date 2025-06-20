export const YOUTUBE_VIDEO_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_LIVE_VIDEO_API =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&maxResults=50&regionCode=IN&key=" +
  import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_WATCHPAGE_SUGGEST = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&videoCategoryId=1&key="+import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_SUGGESTION_API =
  "https://ash-yt-backend-vaz5.vercel.app/suggest?q=";

export const YOUTUBE_SEARCH_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=" +
  import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_TAB_LIST =
  "https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  import.meta.env.VITE_YOUTUBE_API_KEY;

export const YOUTUBE_CHANNEL_PROFILE =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet&key="+import.meta.env.VITE_YOUTUBE_API_KEY;

export const OFFSET_LIVE_CHAT = 25;

export const YT_LOGO = 'https://www.logoquake.com/uploadfile/2024/0616/youtube-2017-logoquake_b250aa.png';

export const ACC_LOGO='https://th.bing.com/th/id/R.c3631c652abe1185b1874da24af0b7c7?rik=XBP%2fc%2fsPy7r3HQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-circled-user-icon-2240.png&ehk=z4ciEVsNoCZtWiFvQQ0k4C3KTQ6wt%2biSysxPKZHGrCc%3d&risl=&pid=ImgRaw&r=0';

// https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&videoCategoryId=10&regionCode=IN&maxResults=20&key=AIzaSyCQFDaM_j77RtTB26RGIE4YofQN_3SSqfI
// https://clients1.google.com/complete/search?client=youtube&ds=yt&hl=en&gl=US&q=SEARCH_TERM
