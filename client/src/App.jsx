import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./layouts/Main";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MyChannel from "./pages/MyChannel";
import Subscriptions from "./pages/Subscriptions";
import History from "./pages/History";
import LikeVideo from "./pages/LikeVideo";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/watch/:id",
          element: <Details />
        },
        {
          path: "/subscriptions",
          element: <Subscriptions />
        },
        {
          path: "/my-channel",
          element: <MyChannel />
        },
        {
          path: "/history",
          element: <History />
        },
        {
          path: "/like-video",
          element: <LikeVideo />
        },
        {
          path: "/results/search/:search",
          element: <SearchResult />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ]
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
