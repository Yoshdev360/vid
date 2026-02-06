import { X } from "lucide-react";

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoTutorialModal({ isOpen, onClose }: VideoTutorialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-purple-400 transition"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Tutorial de Motcha IA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-6 bg-gray-800">
            <h3 className="text-xl font-bold text-white mb-2">Tutorial Completo de Motcha IA</h3>
            <p className="text-gray-400">
              Aprende paso a paso cómo crear videos impresionantes usando nuestra plataforma de inteligencia artificial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
