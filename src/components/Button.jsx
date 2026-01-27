const Button = ({ name, isCategoryId, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-md whitespace-nowrap transition-colors duration-200 text-sm font-medium
        ${
          isCategoryId
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-gray-200 text-black dark:bg-neutral-800 dark:text-white hover:bg-gray-300 dark:hover:bg-neutral-700"
        }`}
    >
      {name}
    </button>
  );
};

export default Button;
