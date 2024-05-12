import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import SingleGif from "./pages/Single-gif";
import Favourite from "./pages/Favourite";
import "./index.css";

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
  return <RouterProvider router={router} />;
};

export default App;
