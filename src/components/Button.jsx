const Button = ({ name, onClick, isCategoryId }) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-4 py-1 m-2 rounded hover:bg-gray-300 flex whitespace-nowrap ${(isCategoryId) ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-black dark:bg-gray-500 dark:text-white'}`}
    >
      {name}
    </button>
  );
};

export default Button;
