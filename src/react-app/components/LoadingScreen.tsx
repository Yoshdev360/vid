import { useEffect, useState } from "react";
import { Box, Loader2 } from "lucide-react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export default function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadComplete(), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <Box className="text-purple-400 w-20 h-20 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Motcha IA</h1>
        <p className="text-gray-400 mb-8">Plataforma de Generación de Video Inteligente</p>
        
        <div className="w-64 mx-auto">
          <div className="bg-gray-800 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span>Cargando aplicación...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
