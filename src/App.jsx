import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatcPage from "./components/WatchPage";
import { Suspense, lazy } from "react";
// import {ShimmerLoader} from "./components/ShimmerEffects";

const ResultPage = lazy(() => import("./components/ResultPage"));
const Trending = lazy(() => import("./components/Live"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/search",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatcPage />,
      },
      {
        path: "/results",
        element: (
          // <Suspense fallback={<ShimmerLoader />}>
          // </Suspense>
            <ResultPage />
        ),
      },
      {
        path: "/live",
        element: (
            <Trending />
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
