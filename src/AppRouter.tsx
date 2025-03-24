import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/Error/ErrorPage";
import HomeLayout from "./components/Layout/HomeLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage type="" />,
  },
  {
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
]);

export default router;
