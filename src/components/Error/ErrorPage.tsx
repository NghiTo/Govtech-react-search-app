import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Unexpected Error";
  let message = "Something went wrong!";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    message = error.data?.message || "Page not found!";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">{title}</h1>
      <p className="text-lg text-gray-700 mb-6">{message}</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
