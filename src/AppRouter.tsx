import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import NotFound from "./components/Error/NotFound";
import ErrorPage from "./components/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen">
        <Header />
        <Outlet />
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Search />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
