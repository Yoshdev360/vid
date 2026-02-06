import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@getmocha/users-service/react";
import { Mail, Lock, LogIn, Loader2, Shield, X } from "lucide-react";
import AnimatedBackground from "@/react-app/components/AnimatedBackground";

export default function LoginPage() {
  const navigate = useNavigate();
  const { redirectToLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await redirectToLogin();
    } catch (error) {
      console.error("Error during Google login:", error);
      setIsLoading(false);
    }
  };

  const [error, setError] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showPrivacyInConsent, setShowPrivacyInConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!consentAccepted) {
      setError("Debes aceptar las políticas de consentimiento para continuar");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al iniciar sesión");
        setIsLoading(false);
        return;
      }

      // Login successful, redirect to home
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error al conectar con el servidor");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="w-full max-w-sm relative z-10">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-3">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Bienvenido</h1>
            <p className="text-gray-400">Inicia sesión en Motcha IA</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-purple-400 hover:text-purple-300"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Consent Checkbox */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => setConsentAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 cursor-pointer"
                />
                <span className="ml-3 text-xs text-gray-300 leading-relaxed">
                  Acepto las{" "}
                  <button
                    type="button"
                    onClick={() => setShowConsentModal(true)}
                    className="text-purple-400 hover:text-purple-300 underline font-medium"
                  >
                    Políticas de Consentimiento
                  </button>
                  {" "}sobre el uso y manipulación de imágenes
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">O continúa con</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-lg transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Google</span>
              </>
            )}
          </button>

          <div className="mt-4 text-center text-sm text-gray-400">
            ¿No tienes cuenta?{" "}
            <button
              onClick={() => navigate("/auth/register")}
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Regístrate
            </button>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col border-2 border-purple-500">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center">
                <Shield className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">
                  {showPrivacyInConsent ? "Política de Privacidad" : "Políticas de Consentimiento"}
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowPrivacyInConsent(false);
                  setShowConsentModal(false);
                }}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 flex-1">
              {showPrivacyInConsent ? (
                <div className="space-y-6 text-gray-300">
                  <section>
                    <h3 className="text-xl font-bold text-white mb-3">1. Información que Recopilamos</h3>
                    <p className="leading-relaxed mb-3">
                      En Motcha IA, recopilamos la siguiente información:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Información de cuenta: nombre, correo electrónico proporcionado por Google OAuth</li>
                      <li>Contenido generado: videos, imágenes y configuraciones de proyectos</li>
                      <li>Datos de uso: estadísticas de uso de la plataforma y preferencias</li>
                      <li>Información de pago: datos de transacciones para compras de monedas o planes</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-white mb-3">2. Cómo Usamos tu Información</h3>
                    <p className="leading-relaxed mb-3">
                      Utilizamos la información recopilada para:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Proporcionar y mejorar nuestros servicios de generación de video con IA</li>
                      <li>Procesar tus solicitudes y gestionar tu cuenta</li>
                      <li>Enviar notificaciones importantes sobre el servicio</li>
                      <li>Personalizar tu experiencia en la plataforma</li>
                      <li>Analizar el uso para mejorar nuestros algoritmos y características</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-white mb-3">3. Seguridad de Datos</h3>
                    <p className="leading-relaxed">
                      Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                      contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación 
                      SSL/TLS para todas las transmisiones de datos y autenticación OAuth 2.0 de Google.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-bold text-white mb-3">4. Contacto</h3>
                    <p className="leading-relaxed">
                      Si tienes preguntas sobre esta política de privacidad, contáctanos en:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 mt-3">
                      <p className="text-purple-400 font-mono">privacy@motcha-ia.com</p>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="space-y-6 text-gray-300">
                <section>
                  <h3 className="text-xl font-bold text-white mb-3">Uso de Imágenes y Contenido Visual</h3>
                  <p className="leading-relaxed mb-3">
                    Al utilizar Motcha IA, otorgas tu consentimiento para que nuestra plataforma procese, 
                    modifique y genere contenido visual basado en tus indicaciones. Esto incluye:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Generación de imágenes mediante inteligencia artificial</li>
                    <li>Procesamiento de prompts y descripciones para crear contenido personalizado</li>
                    <li>Composición y edición automática de videos con las imágenes generadas</li>
                    <li>Aplicación de efectos, transiciones y mejoras visuales</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-3">Manipulación de Imágenes con IA</h3>
                  <p className="leading-relaxed mb-3">
                    Nuestros modelos de inteligencia artificial (Freepik Mystic, DALL-E, Midjourney) 
                    crearán imágenes originales basadas en tus descripciones. Entiendes y aceptas que:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Las imágenes generadas son creaciones únicas de IA basadas en tus instrucciones</li>
                    <li>Pueden incluir representaciones de personas, lugares u objetos según tu solicitud</li>
                    <li>El contenido generado debe cumplir con nuestros términos de uso aceptable</li>
                    <li>No debes solicitar contenido que viole derechos de terceros o sea ilegal</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-3">Derechos y Responsabilidades</h3>
                  <p className="leading-relaxed mb-3">
                    Como usuario de Motcha IA:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Eres propietario del contenido final generado</li>
                    <li>Nos otorgas licencia limitada para procesar y almacenar tus creaciones</li>
                    <li>Podemos usar muestras de contenido generado con fines promocionales (con tu permiso)</li>
                    <li>Eres responsable del uso que des al contenido generado</li>
                    <li>Garantizas que tus solicitudes no infringen derechos de terceros</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-3">Privacidad y Seguridad</h3>
                  <p className="leading-relaxed">
                    Tus datos y contenido generado están protegidos mediante encriptación y medidas de 
                    seguridad robustas. No compartiremos tu contenido con terceros sin tu consentimiento 
                    explícito. Consulta nuestra{" "}
                    <button
                      onClick={() => {
                        setShowConsentModal(false);
                        navigate("/privacy");
                      }}
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Política de Privacidad
                    </button>
                    {" "}para más detalles.
                  </p>
                </section>

                <section className="bg-gray-900 rounded-lg p-4 border border-purple-700">
                  <p className="text-sm text-gray-400 italic">
                    Al aceptar estas políticas, confirmas que has leído, comprendido y aceptas los términos 
                    relacionado con el uso y manipulación de imágenes mediante nuestra plataforma de IA.
                  </p>
                </section>
              </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-700 flex gap-3">
              {showPrivacyInConsent ? (
                <>
                  <button
                    onClick={() => setShowPrivacyInConsent(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Volver
                  </button>
                  <button
                    onClick={() => {
                      setShowPrivacyInConsent(false);
                      setShowConsentModal(false);
                    }}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition"
                  >
                    Cerrar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowConsentModal(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setConsentAccepted(true);
                      setShowConsentModal(false);
                      setShowPrivacyInConsent(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition"
                  >
                    Aceptar y Continuar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
