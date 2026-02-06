import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Loader2 } from "lucide-react";
import AnimatedBackground from "@/react-app/components/AnimatedBackground";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { exchangeCodeForSessionToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await exchangeCodeForSessionToken();
        navigate("/");
      } catch (err) {
        console.error("Error during authentication callback:", err);
        setError("Error al iniciar sesión. Por favor, intenta de nuevo.");
        setTimeout(() => navigate("/auth/login"), 3000);
      }
    };

    handleCallback();
  }, [exchangeCodeForSessionToken, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 text-center">
        <div className="animate-spin mb-4 inline-block">
          <Loader2 className="w-16 h-16 text-purple-500" />
        </div>
        {error ? (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
            <p className="text-gray-400">{error}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Iniciando Sesión</h2>
            <p className="text-gray-400">Por favor, espera un momento...</p>
          </>
        )}
      </div>
    </div>
  );
}
