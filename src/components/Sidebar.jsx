import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeSearch } from "../utils/resultSlice";
import { toggleMenu } from "../utils/appSlice";
import { FaHome, FaLinkedin } from "react-icons/fa";
import { MdLiveTv } from "react-icons/md";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  if (!isMenuOpen) return null;

  const handleOverlayClick = () => {
    dispatch(toggleMenu());
  };

  const getSideBarData = (query) => {
    const data = fetch(YOUTUBE_SEARCH_API + `&q=${query}`);
    const response = data.json();
  };

  const menuItems = [
    { name: "Home", icon: <FaHome />, to: "/" },
    { name: "Live", icon: <MdLiveTv />, to: "/live" },
  ];

  const exploreItems = [
    "Trending",
    "Shopping",
    "Music",
    "Movies",
    "Live",
    "Gaming",
    "News",
    "Sports",
    "Learning",
    "Fashion & Beauty",
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 "
        onClick={handleOverlayClick}
      ></div>

      <div className="fixed top-16 left-0 w-60 h-full shadow-lg z-50 p-4 -my-2 overflow-y-auto text-sm bg-white text-black dark:bg-neutral-950 dark:text-white">
        <ul className="border-b pb-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              onClick={() => item.to && dispatch(removeSearch())}
            >
              {item.to ? (
                <Link to={item.to} className="flex items-center gap-4 w-full">
                  <span>{item.icon}</span> {item.name}
                </Link>
              ) : (
                <>
                  <span>{item.icon}</span> {item.name}
                </>
              )}
            </li>
          ))}
          <li>
            {" "}
            <span className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
              {" "}
              <a
                href="https://www.linkedin.com/in/ashish-n-m/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full"
              >
                <span>
                  <FaLinkedin />
                </span>{" "}
                {"Linkedin"}
              </a>
            </span>{" "}
          </li>
        </ul>

        <h2 className="mt-4 mb-2 font-semibold">Explore</h2>
        <ul className="border-b pb-4">
          {exploreItems.map((item) => (
            <li
              key={item}
              className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
            >
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-4 mb-2 font-semibold">Subscriptions</h2>
        <ul className="border-b pb-4">
          <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
            Music
          </li>
          <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
            Gaming
          </li>
          <li className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700">
            News
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
