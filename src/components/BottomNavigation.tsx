
import React from "react";
import { Home, Search, Bookmark, User } from "lucide-react";
import { Link } from "react-router-dom";

interface BottomNavigationProps {
  activeTab: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab }) => {
  return (
    <div className="w-full h-16 bg-white border-t grid grid-cols-4">
      <Link to="/home" className="flex flex-col items-center justify-center">
        <div className={activeTab === "Home" ? "bg-[#E4F2E2] rounded-full px-3 py-1 flex flex-col items-center" : "flex flex-col items-center"}>
          <Home 
            size={24} 
            className={activeTab === "Home" ? "text-black" : "text-gray-500"} 
          />
          <span className={`text-xs ${activeTab === "Home" ? "font-semibold text-black" : "text-gray-500"}`}>
            Home
          </span>
        </div>
      </Link>
      <Link to="/explore" className="flex flex-col items-center justify-center">
        <div className={activeTab === "Explore" ? "bg-[#E4F2E2] rounded-full px-3 py-1 flex flex-col items-center" : "flex flex-col items-center"}>
          <Search 
            size={24} 
            className={activeTab === "Explore" ? "text-black" : "text-gray-500"} 
          />
          <span className={`text-xs ${activeTab === "Explore" ? "font-semibold text-black" : "text-gray-500"}`}>
            Explore
          </span>
        </div>
      </Link>
      <Link to="/saved" className="flex flex-col items-center justify-center">
        <div className={activeTab === "Saved" ? "bg-[#E4F2E2] rounded-full px-3 py-1 flex flex-col items-center" : "flex flex-col items-center"}>
          <Bookmark 
            size={24} 
            className={activeTab === "Saved" ? "text-black" : "text-gray-500"} 
          />
          <span className={`text-xs ${activeTab === "Saved" ? "font-semibold text-black" : "text-gray-500"}`}>
            Saved
          </span>
        </div>
      </Link>
      <Link to="/profile" className="flex flex-col items-center justify-center">
        <div className={activeTab === "Profile" ? "bg-[#E4F2E2] rounded-full px-3 py-1 flex flex-col items-center" : "flex flex-col items-center"}>
          <User 
            size={24} 
            className={activeTab === "Profile" ? "text-black" : "text-gray-500"} 
          />
          <span className={`text-xs ${activeTab === "Profile" ? "font-semibold text-black" : "text-gray-500"}`}>
            Profile
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BottomNavigation;
