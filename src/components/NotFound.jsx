import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {error?.statusText && (
        <p className="mt-2 text-sm text-gray-400">
          {error.statusText}
        </p>
      )}

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
