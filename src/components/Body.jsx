import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import Head from "../components/Head";
import { useSelector } from "react-redux";
import ScrollToTop from "./ScrollToTop";

const Body = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-neutral-900">
      <div
        className="grid grid-flow-col sticky top-0 z-50 
            bg-white/70 dark:bg-neutral-900/70
            backdrop-blur-md backdrop-saturate-150 
            text-black dark:text-white"
      >
        <Head />
      </div>
      <ScrollToTop />
      <div className="relative">
        <Sidebar />
        <div className="ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;