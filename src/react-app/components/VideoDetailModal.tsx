import { X, Video, User, Calendar, Image, Music, Sparkles, CheckCircle } from "lucide-react";

interface VideoDetail {
  id: number;
  emoji: string;
  gradient: string;
  title: string;
  name: string;
  age: number;
  theme: string;
  images: number;
  emotion: string;
  message: string;
  model: string;
  views: string;
  duration: string;
}

interface VideoDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoDetail | null;
  onUseTemplate: (video: VideoDetail) => void;
}

export default function VideoDetailModal({ isOpen, onClose, video, onUseTemplate }: VideoDetailModalProps) {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in p-2 sm:p-4">
      <div className="relative w-full max-w-3xl max-h-[95vh] bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-purple-400 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Video Preview */}
        <div className={`aspect-video bg-gradient-to-br ${video.gradient} flex items-center justify-center relative`}>
          <span className="text-8xl">{video.emoji}</span>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
            <span className="bg-black bg-opacity-70 px-3 py-1 rounded-full flex items-center">
              <Video className="w-4 h-4 mr-1" />
              {video.views}
            </span>
            <span className="bg-black bg-opacity-70 px-3 py-1 rounded-full">
              {video.duration}
            </span>
          </div>
        </div>

        {/* Video Details */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">{video.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center text-purple-400 mb-2">
                <User className="w-5 h-5 mr-2" />
                <span className="font-semibold">Información</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Nombre:</span>
                  <span className="text-white font-medium">{video.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Edad:</span>
                  <span className="text-white font-medium">{video.age} años</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Emoción:</span>
                  <span className="text-white font-medium">{video.emotion}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700">
              <div className="flex items-center text-blue-400 mb-2">
                <Sparkles className="w-5 h-5 mr-2" />
                <span className="font-semibold">Configuración</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Imágenes:</span>
                  <span className="text-white font-medium">{video.images}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Modelo IA:</span>
                  <span className="text-white font-medium">{video.model}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700 mb-4 sm:mb-6">
            <div className="flex items-center text-green-400 mb-2">
              <Video className="w-5 h-5 mr-2" />
              <span className="font-semibold">Tema del Video</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{video.theme}</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-3 sm:p-4 border border-gray-700 mb-6 sm:mb-8">
            <div className="flex items-center text-yellow-400 mb-2">
              <Music className="w-5 h-5 mr-2" />
              <span className="font-semibold">Mensaje Musical</span>
            </div>
            <p className="text-gray-300 text-sm italic leading-relaxed">"{video.message}"</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium transition text-sm sm:text-base"
            >
              Cerrar
            </button>
            <button
              onClick={() => {
                onUseTemplate(video);
                onClose();
              }}
              className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition flex items-center justify-center text-sm sm:text-base"
            >
              <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Usar Como Plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
