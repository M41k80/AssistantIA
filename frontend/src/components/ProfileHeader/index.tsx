import React from "react";
import { Search, Bell } from "lucide-react";

const ProfileHeader = () => {
  return (
    <div className="flex items-center space-x-4">
      <button className="text-gray-600 hover:text-gray-900">
        <Search className="w-5 h-5" />
      </button>

      <button className="text-gray-600 hover:text-gray-900">
        <Bell className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-black">Karim J.</span>
        <div className="w-8 h-8 rounded-full bg-orange-300 flex items-center justify-center text-white">
          <span className="text-xs">KJ</span>
        </div>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default ProfileHeader;
