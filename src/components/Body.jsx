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
    <>
      <Head />
      <ScrollToTop />
      <div className="relative">
        <Sidebar />
        <div className="ml-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Body;
