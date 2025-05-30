export const ShimmerCard = () => {
  return (
    <div className="p-2 pb-3 m-2 w-80 shadow rounded-lg animate-pulse">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div>
      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-28 mb-2"></div>
    </div>
  );
};

export const ResultShimmer = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 max-w-7xl w-full mx-auto animate-pulse p-4">
      <div className="w-full h-52 md:w-[500px] md:h-[280px] bg-gray-300 dark:bg-gray-700 rounded-xl" />

      <div className="flex flex-col justify-start w-full gap-3 mt-4 md:mt-0">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
      </div>
    </div>
  );
};


export const ShimmerLoader = () => {
  return (
    <div className="flex flex-wrap justify-center bg-white text-black dark:bg-neutral-950 dark:text-white">
        {Array(12)
          .fill(null)
          .map((_, idx) => (
            <span className="p-2 m-2" key={idx}>
              <ShimmerCard />
            </span>
          ))}
      </div>
  );
}; 

export const ShimmerWatchPage = () => {
  return (
        <div className="flex flex-col lg:flex-row w-full bg-white text-black dark:bg-neutral-950 dark:text-white p-4">
      <div className="w-full lg:w-2/3 flex flex-col gap-4">
        <div className="md:pl-20">

        </div>
        </div>
        </div>
  )
}

// export default ShimmerCard;
