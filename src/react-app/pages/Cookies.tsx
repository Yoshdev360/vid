import AppLayout from "@/react-app/components/AppLayout";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700">
          <div className="flex items-center mb-8">
            <Cookie className="w-10 h-10 text-purple-400 mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Política de Cookies</h1>
          </div>

          <div className="text-gray-400 text-sm mb-8">
            Última actualización: Diciembre 2025
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">¿Qué son las Cookies?</h2>
              <p className="leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
                visitas un sitio web. Nos ayudan a mejorar tu experiencia recordando tus preferencias 
                y permitiendo funcionalidades esenciales del servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Tipos de Cookies que Usamos</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">1. Cookies Esenciales</h3>
                  <p className="text-sm leading-relaxed">
                    Estas cookies son necesarias para el funcionamiento básico del sitio. Incluyen 
                    cookies de autenticación y seguridad que te permiten iniciar sesión y navegar 
                    de forma segura.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Ejemplos: mocha_session_token, auth_state
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">2. Cookies de Preferencias</h3>
                  <p className="text-sm leading-relaxed">
                    Permiten que el sitio web recuerde información que cambia la forma en que se 
                    comporta o se ve, como tu idioma preferido o región.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Ejemplos: language_preference, theme_preference
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">3. Cookies de Análisis</h3>
                  <p className="text-sm leading-relaxed">
                    Nos ayudan a entender cómo interactúas con nuestro sitio web, recopilando 
                    información de forma anónima para mejorar nuestros servicios.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Ejemplos: _ga, _gid (Google Analytics)
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">4. Cookies de Marketing</h3>
                  <p className="text-sm leading-relaxed">
                    Se utilizan para mostrar anuncios relevantes para ti y medir la efectividad 
                    de nuestras campañas publicitarias.
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Ejemplos: ads_preferences, marketing_token
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Cookies de Terceros</h2>
              <p className="leading-relaxed mb-3">
                Utilizamos servicios de terceros que pueden establecer sus propias cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google OAuth:</strong> Para autenticación segura</li>
                <li><strong>Google Analytics:</strong> Para análisis de tráfico y uso</li>
                <li><strong>Cloudflare:</strong> Para seguridad y rendimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Gestión de Cookies</h2>
              <p className="leading-relaxed mb-3">
                Puedes controlar y/o eliminar cookies según desees. Puedes eliminar todas las cookies 
                que ya están en tu dispositivo y puedes configurar la mayoría de navegadores para 
                evitar que se instalen.
              </p>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">Cómo gestionar cookies en navegadores populares:</h4>
                <ul className="text-sm space-y-1 ml-4 list-disc list-inside">
                  <li>Google Chrome: Configuración → Privacidad y seguridad → Cookies</li>
                  <li>Firefox: Opciones → Privacidad y seguridad → Cookies</li>
                  <li>Safari: Preferencias → Privacidad → Cookies</li>
                  <li>Edge: Configuración → Privacidad → Cookies</li>
                </ul>
              </div>
              <p className="text-sm text-yellow-400 mt-3">
                ⚠️ Nota: Bloquear cookies esenciales puede afectar la funcionalidad del sitio, 
                incluyendo la capacidad de iniciar sesión.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Duración de las Cookies</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador</li>
                <li><strong>Cookies persistentes:</strong> Permanecen hasta 60 días o hasta que las elimines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Actualizaciones de esta Política</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política de cookies ocasionalmente. Te notificaremos sobre 
                cambios significativos mediante un aviso en nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contacto</h2>
              <p className="leading-relaxed">
                Si tienes preguntas sobre nuestra política de cookies, contáctanos en:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mt-3">
                <p className="text-purple-400 font-mono">cookies@motcha-ia.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
