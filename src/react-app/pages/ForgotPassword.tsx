import { useState } from "react";
import { useNavigate } from "react-router";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import AnimatedBackground from "@/react-app/components/AnimatedBackground";
import CircuitBackground from "@/react-app/components/CircuitBackground";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset when backend supports it
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
        <AnimatedBackground />
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-600 mb-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Correo Enviado
            </h1>
            <p className="text-gray-400 mb-4">
              Si existe una cuenta con {email}, recibirás un correo con instrucciones para restablecer tu contraseña.
            </p>
            <button
              onClick={() => navigate("/auth/login")}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Volver al Inicio de Sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <CircuitBackground />
      
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
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              ¿Olvidaste tu Contraseña?
            </h1>
            <p className="text-gray-400">
              Ingresa tu correo y te enviaremos instrucciones para restablecerla
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg"
            >
              Enviar Instrucciones
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
