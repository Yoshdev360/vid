export default function CookiesContent() {
  return (
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
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">2. Cookies de Preferencias</h3>
            <p className="text-sm leading-relaxed">
              Permiten que el sitio web recuerde información que cambia la forma en que se 
              comporta o se ve, como tu idioma preferido o región.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <h3 className="font-bold text-white mb-2">3. Cookies de Análisis</h3>
            <p className="text-sm leading-relaxed">
              Nos ayudan a entender cómo interactúas con nuestro sitio web, recopilando 
              información de forma anónima para mejorar nuestros servicios.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-3">Gestión de Cookies</h2>
        <p className="leading-relaxed">
          Puedes controlar y/o eliminar cookies según desees. Puedes eliminar todas las cookies 
          que ya están en tu dispositivo y puedes configurar la mayoría de navegadores para 
          evitar que se instalen.
        </p>
      </section>
    </div>
  );
}
