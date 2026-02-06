import AppLayout from "@/react-app/components/AppLayout";
import { Sparkles, Video, Users, Zap, Award, Globe, Target, TrendingUp, Code, Brain, Rocket, Shield, Heart, Star, CheckCircle, Play } from "lucide-react";
import { useScrollAnimation } from "@/react-app/hooks/useScrollAnimation";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Elena Martínez",
      role: "CEO & Fundadora",
      specialty: "IA Generativa",
      image: "👩‍💼",
      description: "15 años de experiencia en machine learning y visión por computadora"
    },
    {
      name: "Carlos Rodríguez",
      role: "CTO",
      specialty: "Arquitectura Cloud",
      image: "👨‍💻",
      description: "Ex-ingeniero senior en Google, especialista en sistemas distribuidos"
    },
    {
      name: "Ana López",
      role: "Head of AI Research",
      specialty: "Deep Learning",
      image: "👩‍🔬",
      description: "PhD en IA, publicaciones en NeurIPS y CVPR"
    },
    {
      name: "Miguel Sánchez",
      role: "Lead Designer",
      specialty: "UX/UI",
      image: "👨‍🎨",
      description: "10 años diseñando experiencias digitales galardonadas"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Premio Innovación Tech 2024",
      description: "Reconocimiento a la mejor startup de IA del año",
      color: "text-yellow-400"
    },
    {
      icon: Star,
      title: "Top 10 Apps IA 2024",
      description: "Seleccionados por TechCrunch como app revolucionaria",
      color: "text-purple-400"
    },
    {
      icon: Trophy,
      title: "Series A $5M",
      description: "Financiamiento de inversores líderes en tecnología",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "50K+ Usuarios Activos",
      description: "Comunidad global en constante crecimiento",
      color: "text-blue-400"
    }
  ];

  const partners = [
    { name: "Google Cloud", icon: "☁️" },
    { name: "OpenAI", icon: "🤖" },
    { name: "Cloudflare", icon: "🔒" },
    { name: "Stripe", icon: "💳" },
    { name: "AWS", icon: "🌐" },
    { name: "Microsoft Azure", icon: "⚡" }
  ];

  const testimonials = [
    {
      name: "María García",
      role: "Event Planner",
      image: "👩",
      text: "Motcha IA transformó completamente mi negocio. Ahora puedo ofrecer videos personalizados a mis clientes en minutos. ¡Increíble!",
      rating: 5
    },
    {
      name: "Carlos Mendoza",
      role: "Marketing Director",
      image: "👨",
      text: "La calidad de los videos generados es impresionante. Hemos reducido nuestros costos de producción en un 80% sin sacrificar calidad.",
      rating: 5
    },
    {
      name: "Laura Hernández",
      role: "Content Creator",
      image: "👩‍🎤",
      text: "Como creadora de contenido, Motcha IA es mi herramienta favorita. La IA entiende perfectamente mi visión creativa.",
      rating: 5
    }
  ];

  const milestones = [
    { year: "2022", event: "Fundación de Motcha IA", description: "Inicio de la visión de democratizar la creación de video con IA" },
    { year: "2023", event: "Lanzamiento Beta", description: "Primera versión pública con 1,000 usuarios pioneros" },
    { year: "2023", event: "100K Videos Generados", description: "Alcanzamos el primer hito importante de producción" },
    { year: "2024", event: "Expansión Internacional", description: "Disponible en 120 países y 15 idiomas" },
    { year: "2024", event: "1M+ Videos Creados", description: "Millón de videos generados por nuestra comunidad" },
    { year: "2025", event: "IA Avanzada V2", description: "Nueva generación de modelos con calidad 4K nativa" }
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-xl overflow-hidden mb-12 border border-purple-500">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sobre Motcha IA
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Revolucionando la creación de contenido visual con inteligencia artificial
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mission Section */}
          <MissionSection />
            

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-purple-500 transition">
              <Video className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">1M+</h3>
              <p className="text-gray-400 text-sm">Videos Generados</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-indigo-500 transition">
              <Users className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">50K+</h3>
              <p className="text-gray-400 text-sm">Usuarios Activos</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-green-500 transition">
              <Globe className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">120+</h3>
              <p className="text-gray-400 text-sm">Países</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center hover:border-yellow-500 transition">
              <TrendingUp className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">98%</h3>
              <p className="text-gray-400 text-sm">Satisfacción</p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Por Qué Elegirnos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-yellow-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Velocidad Incomparable</h3>
                  <p className="text-gray-400">
                    Genera videos profesionales en minutos con nuestros algoritmos optimizados de IA. 
                    Lo que tomaba días ahora toma minutos.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Award className="w-6 h-6 text-purple-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Calidad Premium</h3>
                  <p className="text-gray-400">
                    Tecnología de vanguardia que garantiza resultados de alta calidad en cada proyecto. 
                    Resolución hasta 4K nativa.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-indigo-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Personalización Total</h3>
                  <p className="text-gray-400">
                    Controla cada aspecto de tu video: estilos, música, efectos y transiciones. 
                    Tu creatividad no tiene límites.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-green-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Seguridad Garantizada</h3>
                  <p className="text-gray-400">
                    Tus datos están protegidos con encriptación de nivel empresarial. 
                    Cumplimos con GDPR y estándares internacionales.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Heart className="w-6 h-6 text-pink-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Soporte Dedicado</h3>
                  <p className="text-gray-400">
                    Equipo de soporte disponible 24/7 para ayudarte. Respuestas en menos de 2 horas 
                    para suscriptores premium.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Code className="w-6 h-6 text-blue-400 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">API para Desarrolladores</h3>
                  <p className="text-gray-400">
                    Integra nuestra tecnología en tus propias aplicaciones. 
                    Documentación completa y SDKs en múltiples lenguajes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Nuestro Equipo</h2>
            </div>
            <p className="text-gray-400 mb-8">
              Un equipo diverso de expertos en IA, diseño y tecnología, unidos por la pasión de crear 
              herramientas que empoderen a las personas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500 transition">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-white font-bold mb-1">{member.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-3">{member.specialty}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Nuestra Tecnología</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-purple-500">
                <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  IA Generativa Avanzada
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Utilizamos modelos de última generación como Freepik Mystic, DALL-E 3 y Stable Diffusion 
                  para generar imágenes de alta calidad que capturan perfectamente tu visión creativa.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Modelos multi-modales de última generación</li>
                  <li>✓ Fine-tuning personalizado por caso de uso</li>
                  <li>✓ Procesamiento en paralelo para velocidad máxima</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-indigo-500">
                <h3 className="text-lg font-bold text-indigo-400 mb-3 flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  Composición Musical IA
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Nuestro sistema de composición musical genera canciones originales en más de 20 géneros, 
                  adaptándose perfectamente al tono emocional de tu proyecto.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Generación de melodías únicas y originales</li>
                  <li>✓ Sincronización perfecta con contenido visual</li>
                  <li>✓ Biblioteca de 20+ géneros musicales</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-green-500">
                <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Renderizado en la Nube
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Procesamiento distribuido que permite renderizar videos en resolución 4K en minutos, 
                  sin necesidad de hardware potente en tu dispositivo.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Infraestructura global con CDN optimizado</li>
                  <li>✓ Auto-scaling para manejar picos de demanda</li>
                  <li>✓ 99.9% de uptime garantizado</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-yellow-500">
                <h3 className="text-lg font-bold text-yellow-400 mb-3 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Optimización Automática
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Algoritmos inteligentes que optimizan transiciones, timing y sincronización 
                  audio-visual para resultados profesionales sin intervención manual.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Detección automática de puntos clave</li>
                  <li>✓ Ajuste dinámico de timing musical</li>
                  <li>✓ Color grading inteligente</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Award className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Logros y Reconocimientos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="bg-gray-900 rounded-lg p-6 flex items-start border border-gray-700">
                    <Icon className={`w-10 h-10 ${achievement.color} mr-4 flex-shrink-0`} />
                    <div>
                      <h3 className="text-white font-bold mb-2">{achievement.title}</h3>
                      <p className="text-gray-400 text-sm">{achievement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Nuestra Historia</h2>
            </div>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg mr-4 flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold mb-1">{milestone.event}</h3>
                    <p className="text-gray-400 text-sm">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Socios Tecnológicos</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Colaboramos con las empresas tecnológicas más innovadoras del mundo para ofrecer 
              la mejor experiencia posible.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {partners.map((partner, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700 hover:border-purple-500 transition">
                  <div className="text-3xl mb-2">{partner.icon}</div>
                  <p className="text-xs text-gray-400">{partner.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Lo Que Dicen Nuestros Usuarios</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">{testimonial.image}</div>
                    <div>
                      <h3 className="text-white font-bold">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Expanded */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Casos de Uso</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-pink-500">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Heart className="w-5 h-5 text-pink-400 mr-2" />
                  Celebraciones Personales
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Cumpleaños, aniversarios, graduaciones y eventos especiales. Crea videos memorables 
                  que sorprendan a tus seres queridos con contenido único y personalizado.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Cumpleaños con fotos de toda la vida</li>
                  <li>✓ Aniversarios de bodas emotivos</li>
                  <li>✓ Graduaciones académicas</li>
                  <li>✓ Quinceañeras y Sweet 16</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-blue-500">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                  Marketing y Publicidad
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Genera contenido visual para redes sociales, campañas publicitarias y presentaciones 
                  corporativas en una fracción del tiempo y costo tradicional.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Anuncios para redes sociales</li>
                  <li>✓ Presentaciones de productos</li>
                  <li>✓ Pitch decks animados</li>
                  <li>✓ Testimonios de clientes</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-green-500">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Award className="w-5 h-5 text-green-400 mr-2" />
                  Educación y Formación
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Crea material educativo atractivo, tutoriales visuales y contenido didáctico que 
                  mantiene la atención de los estudiantes y facilita el aprendizaje.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Tutoriales paso a paso</li>
                  <li>✓ Presentaciones educativas</li>
                  <li>✓ Resúmenes de lecciones</li>
                  <li>✓ Material de e-learning</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 border border-purple-500">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                  <Video className="w-5 h-5 text-purple-400 mr-2" />
                  Contenido para Creadores
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Ideal para YouTubers, influencers y creadores de contenido que necesitan producir 
                  videos de alta calidad de manera consistente.
                </p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Intros y outros personalizados</li>
                  <li>✓ Compilaciones automáticas</li>
                  <li>✓ Highlights de streams</li>
                  <li>✓ Contenido para TikTok/Instagram</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-pink-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Nuestros Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Innovación</h3>
                <p className="text-gray-400 text-sm">Siempre buscando nuevas formas de mejorar</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Comunidad</h3>
                <p className="text-gray-400 text-sm">Construimos juntos el futuro</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Transparencia</h3>
                <p className="text-gray-400 text-sm">Honestidad en todo lo que hacemos</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Excelencia</h3>
                <p className="text-gray-400 text-sm">Calidad en cada detalle</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-xl p-8 border border-purple-600 text-center">
            <Rocket className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Únete a la Revolución</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Miles de creadores ya confían en Motcha IA para sus proyectos. 
              Sé parte de la comunidad que está redefiniendo la creación de contenido visual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = "/"}
                className="bg-white hover:bg-gray-100 text-purple-800 font-bold py-3 px-8 rounded-lg transition"
              >
                Comenzar Ahora
              </button>
              <button 
                onClick={() => window.location.href = "/blog"}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Leer Nuestro Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 7h-2V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.86 1.28 3.41 3 3.86V20c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.14c1.72-.45 3-2 3-3.86V9c0-1.1-.9-2-2-2zM6 9h2v3.1c-.94-.3-1.75-.97-2-1.85V9zm10 11H8v-2h8v2zm2-5c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1V5h4v10zm2-4.9c-.25.88-1.06 1.55-2 1.85V9h2v1.1z"/>
    </svg>
  );
}

function MissionSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="flex items-center mb-6">
        <Target className="w-8 h-8 text-purple-400 mr-3" />
        <h2 className="text-2xl font-bold text-white">Nuestra Misión</h2>
      </div>
      <p className="text-gray-300 leading-relaxed mb-4 text-lg">
        En Motcha IA, creemos que cada persona merece tener acceso a herramientas creativas 
        de última generación. Nuestra misión es democratizar la producción de video personalizado 
        mediante inteligencia artificial, haciendo que la creación de contenido memorable sea 
        accesible para todos.
      </p>
      <p className="text-gray-300 leading-relaxed text-lg">
        Combinamos los últimos avances en IA generativa con una interfaz intuitiva para que 
        puedas crear videos impresionantes en minutos, no en horas o días. Creemos que la tecnología 
        debe empoderar a las personas, no complicar sus vidas.
      </p>
    </div>
  );
}
