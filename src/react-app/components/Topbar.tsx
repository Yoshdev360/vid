import { useNavigate } from "react-router";
import { Coins, Plus, Menu, Video } from "lucide-react";
import { useProfile } from "@/react-app/hooks/useProfile";
import { useAuth } from "@getmocha/users-service/react";
import { useEffect, useState } from "react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const [videoCount, setVideoCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetch("/api/videos")
        .then(res => res.json())
        .then(data => setVideoCount(data.length))
        .catch(err => console.error("Error fetching video count:", err));
    }
  }, [user]);

  const getInitials = () => {
    if (!user?.google_user_data?.name) return "U";
    const names = user.google_user_data.name.split(" ");
    return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 md:px-8 shadow-md z-10">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden md:block text-sm text-gray-400">
          <span>Inicio &gt; Video</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-6">
        <div className="hidden md:flex items-center bg-gray-700 rounded-full px-3 py-1.5 border border-gray-600">
          <Video className="text-blue-400 w-4 h-4 mr-2" />
          <span className="font-bold text-blue-100 text-sm">{videoCount}</span>
          <span className="text-xs text-gray-400 ml-1">videos</span>
        </div>

        <div className="flex items-center bg-gray-700 rounded-full px-3 md:px-4 py-1.5 border border-gray-600">
          <Coins className="text-yellow-400 w-4 h-4 mr-1 md:mr-2" />
          <span className="font-bold text-yellow-100 text-sm">{profile?.coins || 0}</span>
          <button
            onClick={() => navigate("/plans")}
            className="ml-2 md:ml-3 text-xs bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 py-0.5 rounded transition flex items-center"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <button
          onClick={() => navigate("/plans")}
          className="hidden md:block text-purple-400 hover:text-purple-300 font-bold text-sm border border-purple-500 rounded px-3 py-1 hover:bg-purple-900 transition"
        >
          {profile?.plan?.toUpperCase() || "FREE"}
        </button>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            {getInitials()}
          </div>
        </div>
      </div>
    </header>
  );
}
