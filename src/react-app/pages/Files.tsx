import { useEffect, useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { Video, Download, Trash2 } from "lucide-react";
import type { Video as VideoType } from "@/shared/types";

export default function FilesPage() {
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const mockVideos = [
    { id: 1, name: "Proyecto Cumpleaños 1", date: "Hace 2 días", size: "15MB" },
    { id: 2, name: "Proyecto Cumpleaños 2", date: "Hace 5 días", size: "18MB" },
    { id: 3, name: "Proyecto Cumpleaños 3", date: "Hace 1 semana", size: "12MB" },
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-6">Mis Archivos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockVideos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition group"
            >
              <div className="bg-black h-32 flex items-center justify-center relative">
                <Video className="text-gray-600 w-12 h-12" />
                <div className="absolute inset-0 bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center cursor-pointer">
                  <div className="text-white text-4xl">▶️</div>
                </div>
              </div>
              <div className="p-4">
                <div className="font-bold text-white text-sm truncate">{video.name}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {video.date} • {video.size}
                </div>
                <div className="mt-3 flex justify-between">
                  <button className="text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
