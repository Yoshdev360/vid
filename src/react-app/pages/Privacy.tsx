import AppLayout from "@/react-app/components/AppLayout";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700">
          <div className="flex items-center mb-8">
            <Shield className="w-10 h-10 text-purple-400 mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Política de Privacidad</h1>
          </div>

          <div className="text-gray-400 text-sm mb-8">
            Última actualización: Diciembre 2025
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Información que Recopilamos</h2>
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
              <h2 className="text-xl font-bold text-white mb-3">2. Cómo Usamos tu Información</h2>
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
              <h2 className="text-xl font-bold text-white mb-3">3. Compartir Información</h2>
              <p className="leading-relaxed">
                No vendemos ni alquilamos tu información personal a terceros. Podemos compartir 
                información únicamente con:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
                <li>Autoridades legales cuando sea requerido por ley</li>
                <li>Empresas afiliadas para mejorar nuestros servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Seguridad de Datos</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
                contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación 
                SSL/TLS para todas las transmisiones de datos y autenticación OAuth 2.0 de Google.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Tus Derechos</h2>
              <p className="leading-relaxed mb-3">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a tu información personal</li>
                <li>Solicitar corrección de datos incorrectos</li>
                <li>Solicitar la eliminación de tu cuenta y datos</li>
                <li>Exportar tus datos en formato legible</li>
                <li>Oponerte al procesamiento de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Retención de Datos</h2>
              <p className="leading-relaxed">
                Conservamos tu información personal mientras tu cuenta esté activa o según sea necesario 
                para proporcionarte servicios. Puedes solicitar la eliminación de tu cuenta en cualquier 
                momento desde la configuración de tu perfil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Contacto</h2>
              <p className="leading-relaxed">
                Si tienes preguntas sobre esta política de privacidad, contáctanos en:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mt-3">
                <p className="text-purple-400 font-mono">privacy@motcha-ia.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
