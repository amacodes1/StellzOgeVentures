// src/screens/ForbiddenPage.tsx
import { Link } from "react-router-dom";
import { LockIcon } from "lucide-react";

const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="w-24 h-24 mx-auto bg-red-100 text-red-600 flex items-center justify-center rounded-full mb-6 shadow-sm">
          <LockIcon size={48} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          403 - Forbidden
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg mb-8">
          Oops! You don’t have permission to view this page. If you think this
          is a mistake, please contact support.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg shadow hover:bg-emerald-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
