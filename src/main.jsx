import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./pages/ErrorPage";
import PostPage from "./pages/PostPage";
import DraftPage from "./pages/DraftPage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/", element: <PostPage /> },
      { path: "/post", element: <PostPage /> },
      { path: "/draft", element: <DraftPage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/post/edit/:id", element: <EditPage /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
