import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="p-2 pb-3 m-2 w-80 shadow rounded-lg animate-pulse">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-3"></div>
      <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-28 mb-2"></div>
    </div>
  );
};

export default ShimmerCard;
