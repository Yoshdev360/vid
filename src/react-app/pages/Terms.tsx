import AppLayout from "@/react-app/components/AppLayout";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-gray-800 rounded-xl p-8 md:p-12 border border-gray-700">
          <div className="flex items-center mb-8">
            <FileText className="w-10 h-10 text-purple-400 mr-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">Términos y Condiciones</h1>
          </div>

          <div className="text-gray-400 text-sm mb-8">
            Última actualización: Diciembre 2025
          </div>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Aceptación de Términos</h2>
              <p className="leading-relaxed">
                Al acceder y utilizar Motcha IA, aceptas estar sujeto a estos Términos y Condiciones. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Descripción del Servicio</h2>
              <p className="leading-relaxed">
                Motcha IA es una plataforma de generación de videos inteligente que utiliza inteligencia 
                artificial para crear contenido visual personalizado. Ofrecemos diferentes planes de suscripción 
                y un sistema de monedas virtuales para acceder a las funcionalidades premium.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Registro y Cuenta</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Debes tener al menos 18 años para usar nuestro servicio</li>
                <li>La autenticación se realiza mediante Google OAuth para garantizar seguridad</li>
                <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                <li>Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Uso Aceptable</h2>
              <p className="leading-relaxed mb-3">
                Al usar Motcha IA, te comprometes a NO:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generar contenido ilegal, ofensivo, difamatorio o que viole derechos de terceros</li>
                <li>Intentar acceder a sistemas no autorizados o realizar ingeniería inversa</li>
                <li>Usar el servicio para spam o actividades maliciosas</li>
                <li>Revender o redistribuir el acceso al servicio sin autorización</li>
                <li>Crear contenido que infrinja derechos de autor o propiedad intelectual</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Propiedad Intelectual</h2>
              <p className="leading-relaxed">
                Los videos que generes usando Motcha IA son de tu propiedad. Sin embargo, otorgas a 
                Motcha IA una licencia no exclusiva para usar, modificar y mostrar el contenido con 
                fines de promoción y mejora del servicio. Motcha IA y su tecnología subyacente son 
                propiedad exclusiva de la empresa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Planes y Pagos</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Los precios están sujetos a cambios con previo aviso de 30 días</li>
                <li>Las monedas virtuales no son reembolsables una vez compradas</li>
                <li>Las suscripciones se renuevan automáticamente hasta que sean canceladas</li>
                <li>Puedes cancelar tu suscripción en cualquier momento desde tu perfil</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Limitación de Responsabilidad</h2>
              <p className="leading-relaxed">
                Motcha IA se proporciona "tal cual" sin garantías de ningún tipo. No somos responsables 
                por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la 
                imposibilidad de usar el servicio. No garantizamos la disponibilidad ininterrumpida del servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Modificaciones</h2>
              <p className="leading-relaxed">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                entrarán en vigor inmediatamente después de su publicación. El uso continuado del servicio 
                después de los cambios constituye tu aceptación de los nuevos términos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">9. Terminación</h2>
              <p className="leading-relaxed">
                Podemos suspender o terminar tu acceso al servicio en cualquier momento, sin previo aviso, 
                por conducta que creamos que viola estos términos o es perjudicial para otros usuarios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">10. Contacto</h2>
              <p className="leading-relaxed">
                Para preguntas sobre estos términos, contáctanos en:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 mt-3">
                <p className="text-purple-400 font-mono">legal@motcha-ia.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
