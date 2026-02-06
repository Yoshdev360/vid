import { useNavigate } from "react-router";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";
import AnimatedBackground from "@/react-app/components/AnimatedBackground";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-600 to-red-600 mb-6 animate-pulse">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Página No Encontrada
          </h2>
          
          <p className="text-gray-400 text-lg mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida. 
            Verifica la URL o regresa al inicio.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-lg transition shadow-lg transform hover:scale-105 flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Ir al Inicio
          </button>
          
          <button
            onClick={handleRefresh}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition shadow-lg transform hover:scale-105 flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Refrescar Página
          </button>
        </div>

        <div className="mt-12 text-gray-500 text-sm">
          <p>¿Necesitas ayuda? Contacta a soporte en <span className="text-purple-400">support@motcha-ia.com</span></p>
        </div>
      </div>
    </div>
  );
}
