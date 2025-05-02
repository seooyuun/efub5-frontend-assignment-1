// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import Playlist from "./pages/Playlist";

const router = createBrowserRouter([
  { path: "/", element: <TodoPage /> },
  { path: "/playlist", element: <Playlist /> },
]);

export default router;
