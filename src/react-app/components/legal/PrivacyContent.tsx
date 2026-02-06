export default function PrivacyContent() {
  return (
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
        <h2 className="text-xl font-bold text-white mb-3">3. Seguridad de Datos</h2>
        <p className="leading-relaxed">
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
          contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos encriptación 
          SSL/TLS para todas las transmisiones de datos y autenticación OAuth 2.0 de Google.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-3">4. Contacto</h2>
        <p className="leading-relaxed">
          Si tienes preguntas sobre esta política de privacidad, contáctanos en:
        </p>
        <div className="bg-gray-900 rounded-lg p-4 mt-3">
          <p className="text-purple-400 font-mono">privacy@motcha-ia.com</p>
        </div>
      </section>
    </div>
  );
}
