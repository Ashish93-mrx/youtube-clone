import Body from "./components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainContainer from "./components/MainContainer";
import WatcPage from "./components/WatchPage";
import Demo from "./components/Demo";
import Demo2 from "./components/Demo2";
import Trending from "./components/Live";
import ResultPage from "./components/ResultPage";

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
        element: <ResultPage/>,
      },
      {
        path: "/demo",
        element: (
          <>
            <Demo2 />
            <Demo />
          </>
        ),
      },
      {
        path: "/live",
        element: <Trending />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
}

export default App;
