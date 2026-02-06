import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, ArrowLeft, CheckCircle } from "lucide-react";
import AnimatedBackground from "@/react-app/components/AnimatedBackground";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement token verification when backend supports it
    setIsVerified(true);
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verificación Exitosa
            </h1>
            <p className="text-gray-400 mb-4">
              Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.
            </p>
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Ir al Inicio de Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
          <button
            onClick={() => navigate("/auth/login")}
            className="flex items-center text-gray-400 hover:text-white mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </button>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-3">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verificar Cuenta
            </h1>
            <p className="text-gray-400">
              Ingresa el código de verificación que recibiste por correo o SMS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Código de Verificación
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-widest focus:border-purple-500 focus:outline-none"
                placeholder="000000"
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Verificar
            </button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-300"
                onClick={() => alert("Código reenviado")}
              >
                ¿No recibiste el código? Reenviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
