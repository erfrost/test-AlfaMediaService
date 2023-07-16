import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivatePage from "./pages/PrivatePage/PrivatePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivatePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
