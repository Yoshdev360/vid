import { Play, CheckCircle, Sparkles, Video, Lightbulb, TrendingUp, BookOpen, Zap, Target, Layers, Settings, DollarSign, Image, Music, Film, FileText, ChevronDown, ChevronUp, AlertCircle, X } from "lucide-react";
import AppLayout from "@/react-app/components/AppLayout";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import VideoTutorialModal from "@/react-app/components/VideoTutorialModal";
import VideoDetailModal from "@/react-app/components/VideoDetailModal";
import { useScrollAnimation } from "@/react-app/hooks/useScrollAnimation";

export default function Home() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof exampleVideos[0] | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    theme: "",
    imageCount: "6",
    emotion: "Alegría",
    message: "",
    aiModel: "Freepik Mystic",
    resolution: "1080p",
    fps: "30",
  });

  // Live cost calculator
  const baseCost = 50;
  const extraImageCost = parseInt(formData.imageCount) > 6 ? (parseInt(formData.imageCount) - 6) * 5 : 0;
  const resolutionCost = formData.resolution === "4K" ? 25 : formData.resolution === "1080p" ? 10 : 0;
  const totalCost = baseCost + extraImageCost + resolutionCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/wizard", { state: formData });
  };

  const handleUseTemplate = (video: typeof exampleVideos[0]) => {
    setFormData({
      name: "",
      age: "",
      theme: video.theme,
      imageCount: video.images.toString(),
      emotion: video.emotion,
      message: video.message,
      aiModel: video.model,
      resolution: "1080p",
      fps: "30",
    });
    
    // Show tooltip for missing fields
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 5000);
    
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleVideoClick = (video: typeof exampleVideos[0]) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxPhotos = 3;
    const currentCount = uploadedPhotos.length;
    const remainingSlots = maxPhotos - currentCount;

    if (remainingSlots <= 0) {
      alert(`Solo puedes subir un máximo de ${maxPhotos} fotos`);
      return;
    }

    const filesToAdd = Array.from(files).slice(0, remainingSlots);
    
    filesToAdd.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedPhotos(prev => [...prev, event.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const exampleVideos = [
    {
      id: 1,
      emoji: "🎂",
      gradient: "from-pink-600 to-rose-600",
      title: "Cumpleaños 30 años - Ana",
      name: "Ana García",
      age: 30,
      theme: "Celebración de cumpleaños número 30 con recuerdos de los últimos 10 años",
      images: 8,
      emotion: "Alegría",
      message: "Treinta años de vida increíble, treinta años de amor y alegría",
      model: "Freepik Mystic",
      views: "3.2K",
      duration: "2:45"
    },
    {
      id: 2,
      emoji: "💒",
      gradient: "from-purple-600 to-pink-600",
      title: "Boda Carlos & María",
      name: "Carlos & María",
      age: 28,
      theme: "Video romántico de boda con momentos especiales de la ceremonia y recepción",
      images: 12,
      emotion: "Nostalgia",
      message: "Dos almas unidas por el amor eterno, comenzando nuestra vida juntos",
      model: "DALL-E 3",
      views: "8.5K",
      duration: "4:20"
    },
    {
      id: 3,
      emoji: "🎓",
      gradient: "from-blue-600 to-cyan-600",
      title: "Graduación Universidad",
      name: "Roberto Sánchez",
      age: 22,
      theme: "Graduación universitaria de ingeniería con fotos del campus y momentos memorables",
      images: 10,
      emotion: "Épico",
      message: "Cinco años de esfuerzo culminan en este gran logro académico",
      model: "Freepik Mystic",
      views: "2.1K",
      duration: "3:15"
    },
    {
      id: 4,
      emoji: "🏢",
      gradient: "from-green-600 to-emerald-600",
      title: "Lanzamiento Startup Tech",
      name: "Equipo TechVision",
      age: 25,
      theme: "Presentación de lanzamiento de startup tecnológica con visión futurista",
      images: 9,
      emotion: "Épico",
      message: "Innovación que cambiará el mundo, tecnología del futuro hoy",
      model: "Midjourney V6",
      views: "5.7K",
      duration: "3:00"
    },
    {
      id: 5,
      emoji: "🎸",
      gradient: "from-orange-600 to-red-600",
      title: "Concierto Banda Local",
      name: "Los Rockeros",
      age: 30,
      theme: "Video promocional de banda de rock con energía y escenas de conciertos",
      images: 11,
      emotion: "Épico",
      message: "Rock and roll corriendo por nuestras venas, música que rompe el silencio",
      model: "Freepik Mystic",
      views: "4.3K",
      duration: "3:30"
    },
    {
      id: 6,
      emoji: "🏖️",
      gradient: "from-cyan-600 to-blue-600",
      title: "Vacaciones en Cancún",
      name: "Familia Rodríguez",
      age: 35,
      theme: "Recuerdos de vacaciones familiares en la playa con momentos divertidos",
      images: 10,
      emotion: "Alegría",
      message: "Sol, arena y mar, memorias familiares que quedarán para siempre",
      model: "DALL-E 3",
      views: "6.8K",
      duration: "3:45"
    },
    {
      id: 7,
      emoji: "🎨",
      gradient: "from-violet-600 to-purple-600",
      title: "Exposición Arte Moderno",
      name: "Laura Martínez",
      age: 27,
      theme: "Exhibición de arte contemporáneo con obras abstractas y coloridas",
      images: 12,
      emotion: "Nostalgia",
      message: "El arte habla cuando las palabras no alcanzan, colores que cuentan historias",
      model: "Midjourney V6",
      views: "3.9K",
      duration: "2:50"
    },
    {
      id: 8,
      emoji: "⚽",
      gradient: "from-green-600 to-lime-600",
      title: "Campeonato Fútbol",
      name: "Club Deportivo",
      age: 20,
      theme: "Video de celebración de campeonato de fútbol con mejores jugadas",
      images: 9,
      emotion: "Épico",
      message: "Campeones en el campo, guerreros con el balón, victoria merecida",
      model: "Freepik Mystic",
      views: "9.2K",
      duration: "3:10"
    },
    {
      id: 9,
      emoji: "👶",
      gradient: "from-pink-500 to-rose-500",
      title: "Primer Año de Bebé",
      name: "Bebé Sofía",
      age: 1,
      theme: "Primer año de vida del bebé con momentos tiernos y desarrollo mes a mes",
      images: 12,
      emotion: "Alegría",
      message: "Doce meses de amor puro, cada día un nuevo descubrimiento",
      model: "DALL-E 3",
      views: "7.1K",
      duration: "4:00"
    },
    {
      id: 10,
      emoji: "🎭",
      gradient: "from-indigo-600 to-purple-600",
      title: "Obra de Teatro",
      name: "Compañía Teatral",
      age: 28,
      theme: "Trailer de obra de teatro dramática con escenas impactantes",
      images: 10,
      emotion: "Nostalgia",
      message: "El escenario es nuestro mundo, cada acto una nueva vida",
      model: "Midjourney V6",
      views: "2.8K",
      duration: "2:30"
    },
    {
      id: 11,
      emoji: "🍰",
      gradient: "from-yellow-600 to-orange-600",
      title: "Aniversario 25 Años",
      name: "Padres Celebrando",
      age: 50,
      theme: "Bodas de plata con 25 años de matrimonio y familia unida",
      images: 11,
      emotion: "Nostalgia",
      message: "Veinticinco años de amor inquebrantable, un cuarto de siglo juntos",
      model: "Freepik Mystic",
      views: "5.4K",
      duration: "3:40"
    },
    {
      id: 12,
      emoji: "🏆",
      gradient: "from-yellow-500 to-amber-600",
      title: "Premio Empresarial",
      name: "Empresa del Año",
      age: 35,
      theme: "Reconocimiento empresarial por innovación y liderazgo en el sector",
      images: 8,
      emotion: "Épico",
      message: "Excelencia reconocida, innovación premiada, líderes del mañana",
      model: "DALL-E 3",
      views: "4.6K",
      duration: "2:55"
    },
    {
      id: 13,
      emoji: "🎄",
      gradient: "from-red-600 to-green-600",
      title: "Navidad Familiar",
      name: "Familia Grande",
      age: 40,
      theme: "Celebración navideña con toda la familia reunida y tradiciones",
      images: 12,
      emotion: "Alegría",
      message: "Navidad llena de amor, familia unida bajo el árbol de la vida",
      model: "Freepik Mystic",
      views: "11.3K",
      duration: "4:15"
    },
    {
      id: 14,
      emoji: "📚",
      gradient: "from-blue-700 to-indigo-600",
      title: "Presentación Libro",
      name: "Autor Novel",
      age: 32,
      theme: "Lanzamiento de primer libro con citas inspiradoras y escenas literarias",
      images: 9,
      emotion: "Nostalgia",
      message: "Páginas que cobran vida, historias que tocan el alma",
      model: "Midjourney V6",
      views: "3.5K",
      duration: "3:05"
    },
    {
      id: 15,
      emoji: "🌟",
      gradient: "from-purple-500 to-pink-500",
      title: "Quinceañera Especial",
      name: "Isabella López",
      age: 15,
      theme: "Celebración de 15 años con vals, amigos y momentos mágicos",
      images: 12,
      emotion: "Alegría",
      message: "Quince años de sueños cumplidos, princesa que se convierte en reina",
      model: "DALL-E 3",
      views: "6.9K",
      duration: "3:50"
    }
  ];

  const promptGuides = [
    {
      title: "Sé Específico y Descriptivo",
      description: "En lugar de 'cumpleaños', usa 'cumpleaños sorpresa con tema de superhéroes para niño de 8 años'",
      example: "❌ 'Fiesta' → ✅ 'Fiesta de graduación universitaria con toga y birrete, ambiente elegante y emotivo'",
      color: "border-purple-500"
    },
    {
      title: "Define el Tono Emocional",
      description: "Especifica cómo quieres que se sienta el video: alegre, nostálgico, épico, romántico, divertido",
      example: "✅ 'Video emotivo y nostálgico de aniversario de bodas con 30 años de recuerdos'",
      color: "border-blue-500"
    },
    {
      title: "Menciona Elementos Visuales Clave",
      description: "Incluye colores, objetos, lugares o símbolos importantes para tu tema",
      example: "✅ 'Playa al atardecer con tonos naranjas y rosas, palmeras, olas suaves, ambiente tropical'",
      color: "border-green-500"
    },
    {
      title: "Usa Palabras de Acción",
      description: "Verbos que describan movimiento o acción hacen los prompts más dinámicos",
      example: "✅ 'Celebrando, bailando, saltando de alegría, abrazándose emocionados'",
      color: "border-yellow-500"
    },
    {
      title: "Establece el Estilo Visual",
      description: "Menciona si quieres un estilo realista, artístico, cinematográfico, vintage, moderno, etc.",
      example: "✅ 'Estilo cinematográfico profesional, iluminación dramática, colores vibrantes'",
      color: "border-pink-500"
    },
    {
      title: "Piensa en la Narrativa",
      description: "Cuenta una historia: inicio, desarrollo y conclusión de tu video",
      example: "✅ 'Comienza con preparativos, muestra la sorpresa, termina con celebración grupal'",
      color: "border-indigo-500"
    }
  ];

  const methodology = [
    {
      step: 1,
      title: "Análisis de Prompt",
      description: "Nuestro sistema de IA analiza tu descripción y extrae elementos clave: tema, emoción, estilo y contexto.",
      icon: FileText,
      color: "bg-purple-600"
    },
    {
      step: 2,
      title: "Generación de Imágenes",
      description: "Utilizando modelos como Freepik Mystic o DALL-E, generamos imágenes únicas basadas en tu descripción.",
      icon: Image,
      color: "bg-blue-600"
    },
    {
      step: 3,
      title: "Composición Musical",
      description: "IA genera una canción original en el género seleccionado, sincronizada con el tono emocional de tu video.",
      icon: Music,
      color: "bg-green-600"
    },
    {
      step: 4,
      title: "Sincronización y Transiciones",
      description: "Algoritmos avanzados sincronizan audio e imágenes, aplicando transiciones suaves y efectos profesionales.",
      icon: Zap,
      color: "bg-yellow-600"
    },
    {
      step: 5,
      title: "Renderizado Final",
      description: "El video se renderiza en la nube en la resolución seleccionada, optimizado para compartir en redes sociales.",
      icon: Film,
      color: "bg-pink-600"
    }
  ];

  const infoCards = [
    {
      icon: Video,
      title: "Proceso de Creación",
      description: "Nuestro sistema utiliza IA avanzada para transformar tus ideas en videos profesionales en minutos. Desde la generación de imágenes hasta la composición musical.",
      color: "from-purple-600 to-indigo-600",
    },
    {
      icon: Lightbulb,
      title: "Metodología Inteligente",
      description: "Combinamos múltiples modelos de IA para generar contenido único. Cada video pasa por etapas de estilización, sincronización y renderizado optimizado.",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: Target,
      title: "Tips Profesionales",
      description: "Define claramente tu tema, selecciona emociones específicas y proporciona contexto detallado. Cuanto más específico seas, mejores resultados obtendrás.",
      color: "from-pink-600 to-rose-600",
    },
    {
      icon: Zap,
      title: "Optimización Rápida",
      description: "Usa nuestros modelos preconfigurados para resultados rápidos. Experimenta con diferentes estilos y transiciones para encontrar tu estética perfecta.",
      color: "from-orange-600 to-amber-600",
    },
    {
      icon: Layers,
      title: "Capas de Personalización",
      description: "Controla cada aspecto: desde el vestuario visual hasta el ritmo musical. Ajusta transiciones, efectos y la duración de cada escena.",
      color: "from-green-600 to-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Evolución Continua",
      description: "Nuestra IA aprende constantemente. Cada video creado ayuda a mejorar los algoritmos para ofrecer resultados cada vez más impresionantes.",
      color: "from-violet-600 to-purple-600",
    },
  ];

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-3 mb-2">
            <h2 className="text-2xl font-bold text-white mb-2">Crear Nuevo Video</h2>
            <p className="text-gray-400">
              Completa el formulario para iniciar la magia de la IA. Define el tema, sube
              referencias y deja que nuestros motores creativos hagan el resto.
            </p>
          </div>

          <div ref={formRef} className="col-span-1 lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative">
            {showTooltip && (
              <div className="absolute -top-16 left-0 right-0 z-20 animate-fade-in">
                <div className="bg-yellow-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-start">
                  <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Plantilla cargada</p>
                    <p className="text-xs">Por favor completa los campos: Nombre y Edad</p>
                  </div>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Dirigido a (Nombre)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="Ej. María Pérez"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Edad
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                    placeholder="Ej. 25"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Tema del Video
                </label>
                <input
                  type="text"
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                  placeholder="Ej. Fiesta sorpresa en la oficina con temática espacial"
                />
              </div>

              {/* Photo Upload Section */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Agregar Fotos (Opcional - Máximo 3)
                </label>
                <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={uploadedPhotos.length >= 3}
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`block w-full text-center py-3 px-4 rounded-lg border-2 border-dashed transition cursor-pointer ${
                      uploadedPhotos.length >= 3
                        ? 'border-gray-700 bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'border-purple-500 hover:bg-gray-800 text-purple-400 hover:text-purple-300'
                    }`}
                  >
                    <Image className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">
                      {uploadedPhotos.length >= 3 
                        ? 'Máximo de fotos alcanzado' 
                        : 'Click para agregar fotos'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadedPhotos.length}/3 fotos cargadas
                    </p>
                  </label>

                  {/* Photo Preview Grid */}
                  {uploadedPhotos.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo}
                            alt={`Foto ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2 border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                            Foto {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Estas fotos se usarán como referencia para generar el video personalizado
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Número de Imágenes
                  </label>
                  <input
                    type="number"
                    max="12"
                    min="3"
                    value={formData.imageCount}
                    onChange={(e) => setFormData({ ...formData, imageCount: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                  />
                  <span className="text-xs text-gray-500">Máx: 12 (6 incluidas, extras: +5🪙 c/u)</span>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                    Emoción
                  </label>
                  <select
                    value={formData.emotion}
                    onChange={(e) => setFormData({ ...formData, emotion: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                  >
                    <option>Alegría</option>
                    <option>Nostalgia</option>
                    <option>Épico</option>
                    <option>Divertido</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Mensaje para la Canción
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                  placeholder="Describe qué debe decir la letra de la canción..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                  Modelo de IA (Imágenes)
                </label>
                <select
                  value={formData.aiModel}
                  onChange={(e) => setFormData({ ...formData, aiModel: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                >
                  <option>Freepik Mystic</option>
                  <option>Midjourney V6 (Mock)</option>
                  <option>DALL-E 3 (Mock)</option>
                </select>
              </div>

              {/* Advanced Settings Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-purple-400 hover:bg-gray-700 transition mb-6 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  <span className="font-medium">Ajustes Avanzados</span>
                </div>
                {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showAdvanced && (
                <div className="bg-gray-900 rounded-lg p-4 mb-6 space-y-4 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                        Resolución de Video
                      </label>
                      <select
                        value={formData.resolution}
                        onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                      >
                        <option value="720p">HD (720p) - Gratis</option>
                        <option value="1080p">Full HD (1080p) - +10🪙</option>
                        <option value="4K">4K Ultra HD - +25🪙</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                        Fotogramas por Segundo
                      </label>
                      <select
                        value={formData.fps}
                        onChange={(e) => setFormData({ ...formData, fps: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none"
                      >
                        <option value="24">24 FPS (Cinematográfico)</option>
                        <option value="30">30 FPS (Estándar)</option>
                        <option value="60">60 FPS (Suave)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Cost Calculator */}
              <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg p-4 mb-6 border border-purple-600">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-yellow-400 mr-2" />
                  <h3 className="text-white font-bold">Costo Total Estimado</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Costo Base (Video HD)</span>
                    <span>{baseCost} 🪙</span>
                  </div>
                  {extraImageCost > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Imágenes Extra ({parseInt(formData.imageCount) - 6})</span>
                      <span>+{extraImageCost} 🪙</span>
                    </div>
                  )}
                  {resolutionCost > 0 && (
                    <div className="flex justify-between text-gray-300">
                      <span>Resolución {formData.resolution}</span>
                      <span>+{resolutionCost} 🪙</span>
                    </div>
                  )}
                  <div className="border-t border-purple-700 pt-2 flex justify-between text-yellow-400 font-bold text-lg">
                    <span>Total</span>
                    <span>{totalCost} 🪙</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  * Regeneraciones de letra: 10🪙 | Música personalizada: 15🪙
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-[1.01] flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generar Video
              </button>
            </form>
          </div>

          <div className="col-span-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-lg overflow-hidden h-full flex flex-col">
              <div 
                onClick={() => setShowTutorial(true)}
                className="bg-black h-48 flex items-center justify-center relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-purple-900 opacity-20 group-hover:opacity-30 transition"></div>
                <Play className="text-white opacity-80 w-16 h-16 group-hover:scale-110 transition duration-300" />
                <span className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-70 px-2 py-1 rounded text-white">
                  02:15
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-purple-600 rounded-full p-4 shadow-2xl">
                    <Play className="text-white w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="font-bold text-white text-lg mb-2">Tutorial Rápido</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Aprende cómo crear videos impactantes en 3 simples pasos usando nuestra
                  herramienta.
                </p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 w-4 h-4 mr-2" />
                    Define tu idea
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 w-4 h-4 mr-2" />
                    Selecciona estilos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 w-4 h-4 mr-2" />
                    Personaliza la música
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Methodology Section */}
        <MethodologySection />

          

        {/* AI Prompt Guide Section */}
        <PromptGuideSection promptGuides={promptGuides} />

        {/* Example Videos Section */}
        <div className="pt-8 border-t border-gray-700">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-3">
              <Video className="w-7 h-7 text-purple-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Videos de Ejemplo</h2>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto mb-4">
              Inspírate con estos ejemplos de videos creados por nuestra comunidad. Haz clic en "Ver Detalles" para conocer los parámetros exactos utilizados.
            </p>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              {showExamples ? "Ocultar Ejemplos" : "Ver 15 Ejemplos"}
            </button>
          </div>

          {showExamples && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {exampleVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition group"
                >
                  <div 
                    onClick={() => handleVideoClick(video)}
                    className={`aspect-video bg-gradient-to-br ${video.gradient} flex items-center justify-center relative cursor-pointer`}
                  >
                    <span className="text-6xl">{video.emoji}</span>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <span className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-70 px-2 py-1 rounded text-white">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 right-2 text-xs bg-black bg-opacity-70 px-2 py-1 rounded text-white flex items-center">
                      <Video className="w-3 h-3 mr-1" />
                      {video.views}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-bold mb-3 text-lg">{video.title}</h3>
                    
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Nombre:</span>
                        <span className="text-gray-300">{video.name}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Edad:</span>
                        <span className="text-gray-300">{video.age} años</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Tema:</span>
                        <span className="text-gray-300 line-clamp-2">{video.theme}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Imágenes:</span>
                        <span className="text-gray-300">{video.images}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Emoción:</span>
                        <span className="text-gray-300">{video.emotion}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Mensaje:</span>
                        <span className="text-gray-300 italic line-clamp-2">"{video.message}"</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-purple-400 font-semibold min-w-[60px]">Modelo:</span>
                        <span className="text-gray-300">{video.model}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleUseTemplate(video)}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded transition text-sm"
                    >
                      Usar Como Plantilla
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informational Cards Section */}
        <InfoCardsSection infoCards={infoCards} />
      </div>

      <VideoTutorialModal isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      <VideoDetailModal 
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)}
        video={selectedVideo}
        onUseTemplate={handleUseTemplate}
      />
    </AppLayout>
  );
}

function MethodologySection() {
  const { ref, isVisible } = useScrollAnimation();
  
  const methodology = [
    {
      step: 1,
      title: "Análisis de Prompt",
      description: "Nuestro sistema de IA analiza tu descripción y extrae elementos clave: tema, emoción, estilo y contexto.",
      icon: FileText,
      color: "bg-purple-600"
    },
    {
      step: 2,
      title: "Generación de Imágenes",
      description: "Utilizando modelos como Freepik Mystic o DALL-E, generamos imágenes únicas basadas en tu descripción.",
      icon: Image,
      color: "bg-blue-600"
    },
    {
      step: 3,
      title: "Composición Musical",
      description: "IA genera una canción original en el género seleccionado, sincronizada con el tono emocional de tu video.",
      icon: Music,
      color: "bg-green-600"
    },
    {
      step: 4,
      title: "Sincronización y Transiciones",
      description: "Algoritmos avanzados sincronizan audio e imágenes, aplicando transiciones suaves y efectos profesionales.",
      icon: Zap,
      color: "bg-yellow-600"
    },
    {
      step: 5,
      title: "Renderizado Final",
      description: "El video se renderiza en la nube en la resolución seleccionada, optimizado para compartir en redes sociales.",
      icon: Film,
      color: "bg-pink-600"
    }
  ];

  return (
    <div ref={ref} className={`pt-8 border-t border-gray-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <Zap className="w-8 h-8 text-yellow-400 mr-3" />
          <h2 className="text-4xl font-bold text-white">Metodología de Creación</h2>
        </div>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Descubre el proceso paso a paso de cómo convertimos tu idea en un video profesional
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 mb-12">
        {methodology.map((item, index) => {
          const Icon = item.icon;
          const isOdd = item.step % 2 !== 0;
          
          return (
            <MethodologyItem key={item.step} item={item} Icon={Icon} isOdd={isOdd} index={index} />
          );
        })}
      </div>
    </div>
  );
}

function MethodologyItem({ item, Icon, isOdd, index }: { item: any, Icon: any, isOdd: boolean, index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${isOdd ? '' : 'md:flex-row-reverse'} ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isOdd ? '-translate-x-10' : 'translate-x-10'}`}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0">
        <div className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${item.color.replace('bg-', 'from-')} to-gray-900 flex items-center justify-center shadow-2xl transform hover:scale-105 transition duration-300`}>
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 font-bold text-xl shadow-lg">
            {item.step}
          </div>
          <Icon className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className={`flex-1 bg-gray-800 rounded-2xl p-8 border-2 border-gray-700 hover:border-purple-500 transition shadow-xl ${isOdd ? 'md:ml-0' : 'md:mr-0'}`}>
        <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
        <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

function PromptGuideSection({ promptGuides }: { promptGuides: any[] }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`pt-8 border-t border-gray-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-3">
          <Lightbulb className="w-7 h-7 text-yellow-500 mr-3" />
          <h2 className="text-3xl font-bold text-white">Guías de Estilo IA</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Aprende a escribir prompts efectivos para obtener los mejores resultados con nuestra IA
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {promptGuides.map((guide, index) => (
          <PromptGuideCard key={index} guide={guide} index={index} />
        ))}
      </div>
    </div>
  );
}

function PromptGuideCard({ guide, index }: { guide: any, index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-xl p-8 border-2 ${guide.color} hover:shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className="text-white font-bold mb-4 text-xl">{guide.title}</h3>
      <p className="text-gray-300 text-base mb-5 leading-relaxed">{guide.description}</p>
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
        <p className="text-sm text-gray-400 font-mono leading-relaxed">{guide.example}</p>
      </div>
    </div>
  );
}

function InfoCardsSection({ infoCards }: { infoCards: any[] }) {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className={`pt-8 border-t border-gray-700 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-3">
          <BookOpen className="w-7 h-7 text-purple-500 mr-3" />
          <h2 className="text-3xl font-bold text-white">Cómo Funcionan Nuestros Videos</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Descubre la metodología detrás de la creación de videos con IA y aprende tips profesionales para optimizar tus resultados
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {infoCards.map((card, index) => (
          <InfoCard key={index} card={card} index={index} />
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-8 text-center border border-purple-600">
        <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-3">¿Listo para Crear?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Comienza tu primera creación ahora y descubre el poder de la inteligencia artificial aplicada a la producción de video
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white hover:bg-gray-100 text-purple-900 font-bold py-3 px-8 rounded-lg transition"
        >
          Crear Mi Primer Video
        </button>
      </div>
    </div>
  );
}

function InfoCard({ card, index }: { card: any, index: number }) {
  const { ref, isVisible } = useScrollAnimation();
  const Icon = card.icon;
  
  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-700 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-5 group-hover:scale-110 transition`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition">
        {card.title}
      </h3>
      <p className="text-base text-gray-400 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
}
