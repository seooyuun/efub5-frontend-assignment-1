// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import Playlist from "./pages/Playlist";
import Gallery from "./pages/Gallery";

const router = createBrowserRouter([
  { path: "/", element: <TodoPage /> },
  { path: "/playlist", element: <Playlist /> },
  { path: "/gallery", element: <Gallery /> },
]);

export default router;
