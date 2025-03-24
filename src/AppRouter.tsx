import { createBrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import ErrorPage from "./components/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Search />
      </div>
    ),
    errorElement: <ErrorPage type="" />,
  },
  {
    path: "*",
    element: <ErrorPage type="not-found" />,
  },
]);

export default router;
