import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import { Suspense, lazy } from "react";
import NotFound from "./components/NotFound";

const ResultPage = lazy(() => import("./components/ResultPage"));
const Trending = lazy(() => import("./components/Live"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MainContainer />,
      },
      {
        path: "search",
        element: <MainContainer />,
      },
      {
        path: "watch",
        element: <WatchPage />,
      },
      {
        path: "results",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResultPage />
          </Suspense>
        ),
      },
      {
        path: "live",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Trending />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;