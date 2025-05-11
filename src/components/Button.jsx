const Button = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-xs px-4 py-1 m-2 bg-gray-200 rounded hover:bg-gray-300 flex whitespace-nowrap text-black dark:bg-gray-500 dark:text-white"
    >
      {name}
    </button>
  );
};

export default Button;
