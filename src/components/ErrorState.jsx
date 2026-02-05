import { MdErrorOutline, MdRefresh } from "react-icons/md";

const errorMap = {
  400: {
    title: "Content Unavailable",
    description:
      "This content isn’t available right now. Please try again later.",
  },
  404: {
    title: "Video Not Found",
    description:
      "This video may have been removed or is no longer available.",
  },
  500: {
    title: "Server Error",
    description:
      "Something went wrong on our side. Please try again shortly.",
  },
  NETWORK: {
    title: "You're Offline",
    description:
      "Please check your internet connection and try again.",
  },
};

const ErrorState = ({ code = "NETWORK", onRetry }) => {
  const { title, description } =
    errorMap[code] || errorMap.NETWORK;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-16 px-4 text-center">
      <MdErrorOutline className="text-5xl text-red-500 mb-4" />

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          <MdRefresh />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;