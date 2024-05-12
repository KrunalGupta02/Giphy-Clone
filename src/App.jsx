import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import SingleGif from "./pages/Single-gif";
import Favourite from "./pages/Favourite";
import "./index.css";
import GifProvider from "./Context/Context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:type/:slug",
        element: <SingleGif />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={router} />;
    </GifProvider>
  );
};

export default App;
