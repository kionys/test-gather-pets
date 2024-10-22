"use client";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center h-16 px-6">
        <button onClick={() => handleNavigation("/home")} className="flex flex-col items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l9-9 9 9M4 10v10a2 2 0 002 2h3m10-12v12a2 2 0 01-2 2h-3m-4-4h-4v-4"
            />
          </svg>
          <span className="text-xs text-gray-600">Home</span>
        </button>

        <button onClick={() => handleNavigation("/search")} className="flex flex-col items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 15l5 5m-5-5a7 7 0 10-10 0 7 7 0 0010 0z"
            />
          </svg>
          <span className="text-xs text-gray-600">Search</span>
        </button>

        <button onClick={() => handleNavigation("/add-post")} className="flex flex-col items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-xs text-gray-600">Add</span>
        </button>

        <button
          onClick={() => handleNavigation("/notifications")}
          className="flex flex-col items-center justify-center"
        >
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-2.811A2 2 0 0016.905 13H15m-6 0H7.095A2 2 0 005.405 14.189L4 17h5m4-14v2m0 4v4m0 4v4"
            />
          </svg>
          <span className="text-xs text-gray-600">Notifications</span>
        </button>

        <button onClick={() => handleNavigation("/profile")} className="flex flex-col items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-600 hover:text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 13.242A4 4 0 116.343 12m1.414 0A4 4 0 114 16.97M12 18a6 6 0 00-6 6h12a6 6 0 00-6-6z"
            />
          </svg>
          <span className="text-xs text-gray-600">Profile</span>
        </button>
      </div>
    </footer>
  );
};
