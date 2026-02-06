import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AppLayout from "@/react-app/components/AppLayout";
import { useProfile } from "@/react-app/hooks/useProfile";
import { ArrowRight, RotateCw, Check, Loader2, Film, Music as MusicIcon, Upload, RefreshCw } from "lucide-react";
import ConfirmModal from "@/react-app/components/ConfirmModal";
import { useAuth } from "@getmocha/users-service/react";

interface WizardStep {
  step: number;
  title: string;
}

const steps: WizardStep[] = [
  { step: 1, title: "Vestuario" },
  { step: 2, title: "Letra y Música" },
  { step: 3, title: "Selección de Imágenes" },
  { step: 4, title: "Transiciones" },
  { step: 5, title: "Resultado" },
];

const musicGenres = [
  "Pop",
  "Rock",
  "Hip Hop",
  "Electronic",
  "Jazz",
  "Classical",
  "Reggaeton",
  "Bachata",
  "Salsa",
  "Country",
  "R&B",
  "Blues",
  "Folk",
  "Metal",
  "Indie",
  "Disco",
  "Funk",
  "Soul",
  "Ambient",
  "Trap"
];

// Generate random emoji images
const generateRandomImages = (count: number, excludeIds: number[] = []) => {
  const allEmojis = ["🏊", "🏖️", "🎂", "🎁", "📷", "🎵", "⭐", "❤️", "☀️", "💧", "🚢", "✈️", "🌺", "🎭", "🎨", "🎪", "🎬", "🎯", "🏆", "🌈", "🌟", "💫", "🔥", "⚡", "🌸", "🎀", "🎊", "🎉", "🍾", "🥂"];
  const images = [];
  let nextId = excludeIds.length > 0 ? Math.max(...excludeIds) + 1 : 0;
  
  for (let i = 0; i < count; i++) {
    const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
    images.push({
      id: nextId++,
      icon: randomEmoji,
      label: `Escena ${nextId}`,
    });
  }
  
  return images;
};

export default function WizardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, updateCoins } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCostume, setSelectedCostume] = useState<number | null>(null);
  const [selectedLyric, setSelectedLyric] = useState<number | null>(null);
  const [selectedMusicGenre, setSelectedMusicGenre] = useState<string>("Pop");
  const [customMusicFile, setCustomMusicFile] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [imageHistory, setImageHistory] = useState<Array<{id: number, icon: string, label: string}>>([]);
  const [availableImages, setAvailableImages] = useState<Array<{id: number, icon: string, label: string}>>(generateRandomImages(12));
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    cost: number;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const formData = location.state || {};

  const costumes = [
    { id: 1, color: "bg-blue-500", label: "Estilo Cibernético", icon: "🤖" },
    { id: 2, color: "bg-green-500", label: "Estilo Natural", icon: "🌿" },
    { id: 3, color: "bg-pink-500", label: "Estilo Pop", icon: "⚡" },
  ];

  const lyrics = [
    {
      id: 1,
      title: "Opción A",
      text: 'En la playa bajo el sol,\ncelebramos hoy tu día...\n(Estilo: Reggaeton Suave)',
    },
    {
      id: 2,
      title: "Opción B",
      text: 'Las olas cantan tu nombre,\narena y sal en los pies...\n(Estilo: Balada Acústica)',
    },
  ];

  const handleNext = () => {
    if (currentStep === 1 && selectedCostume === null) return;
    if (currentStep === 2 && selectedLyric === null) return;
    if (currentStep === 3 && selectedImages.length === 0) return;

    if (currentStep === 4) {
      handleGenerateVideo();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleRegenerateLyrics = () => {
    setModalConfig({
      cost: 10,
      message: "Generar nuevas letras reemplazará las actuales.",
      onConfirm: async () => {
        await updateCoins(-10, "Regeneración de letras");
        setShowModal(false);
        setSelectedLyric(null);
      },
    });
    setShowModal(true);
  };

  const handleRefreshImages = () => {
    setModalConfig({
      cost: 10,
      message: "Refrescar las imágenes te mostrará nuevas opciones.",
      onConfirm: async () => {
        await updateCoins(-10, "Refresh de imágenes");
        
        // Save currently selected images to history
        const selectedImageObjects = availableImages.filter(img => selectedImages.includes(img.id));
        const newHistory = [...imageHistory, ...selectedImageObjects];
        setImageHistory(newHistory);
        
        // Generate new images excluding those in history
        const excludeIds = newHistory.map(img => img.id);
        const newImages = generateRandomImages(12, excludeIds);
        setAvailableImages(newImages);
        
        // Clear current selections
        setSelectedImages([]);
        
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const handleCustomMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setCustomMusicFile(file);
        setModalConfig({
          cost: 15,
          message: "Subir música personalizada tiene un costo adicional.",
          onConfirm: async () => {
            await updateCoins(-15, "Música personalizada");
            setShowModal(false);
          },
        });
        setShowModal(true);
      } else {
        alert('Por favor selecciona un archivo de audio válido');
      }
    }
  };

  const handleImageSelect = (id: number) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((i) => i !== id));
    } else {
      const totalSelected = selectedImages.length + imageHistory.length;
      
      if (totalSelected >= 6) {
        setModalConfig({
          cost: 5,
          message: "Has superado el límite gratuito de 6 imágenes. ¿Añadir imagen extra?",
          onConfirm: async () => {
            await updateCoins(-5, "Imagen extra");
            setSelectedImages([...selectedImages, id]);
            setShowModal(false);
          },
        });
        setShowModal(true);
      } else {
        setSelectedImages([...selectedImages, id]);
      }
    }
  };

  const handleGenerateVideo = async () => {
    setCurrentStep(5);
    setIsProcessing(true);

    try {
      // Deduct coins for video generation
      await updateCoins(-50, "Generación de video");

      // Create video record in database
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          age: parseInt(formData.age),
          theme: formData.theme,
          image_count: selectedImages.length + imageHistory.length,
          emotion: formData.emotion,
          message: formData.message,
          ai_model: formData.aiModel,
        }),
      });

      if (response.ok) {
        // Check if there's a "create first video" mission to complete
        try {
          await fetch("/api/missions/complete", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ mission_id: 5 }),
          });
        } catch (err) {
          console.log("Mission already completed or doesn't exist");
        }
      }

      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error("Error generating video:", error);
      setIsProcessing(false);
    }
  };

  const progress = (currentStep / 5) * 100;
  const totalSelectedImages = selectedImages.length + imageHistory.length;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl font-bold text-white">
              Paso {currentStep}: {steps[currentStep - 1].title}
            </h2>
            <span className="text-purple-400 font-mono text-sm">Progreso: {progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div className="mb-4 text-gray-400">
              Selecciona el estilo visual base para <strong>{formData.name}</strong>.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {costumes.map((costume) => (
                <div
                  key={costume.id}
                  onClick={() => setSelectedCostume(costume.id)}
                  className={`cursor-pointer bg-gray-800 rounded-xl overflow-hidden border transition h-64 flex flex-col group relative ${
                    selectedCostume === costume.id
                      ? "border-purple-500 ring-2 ring-purple-500"
                      : "border-gray-700 hover:border-purple-500"
                  }`}
                >
                  <div
                    className={`${costume.color} flex-1 flex items-center justify-center text-white text-6xl group-hover:scale-110 transition duration-500`}
                  >
                    {costume.icon}
                  </div>
                  <div className="p-4 text-center font-bold text-white bg-gray-800 relative">
                    {costume.label}
                    {selectedCostume === costume.id && (
                      <div className="absolute top-2 right-2 text-green-500">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedCostume === null}
                className={`font-bold py-3 px-8 rounded flex items-center ${
                  selectedCostume === null
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-500"
                }`}
              >
                Siguiente <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-fade-in">
            <div className="mb-4 text-gray-400">
              Hemos generado estas letras basadas en tu tema. Elige una o genera nuevas.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {lyrics.map((lyric) => (
                <div
                  key={lyric.id}
                  onClick={() => setSelectedLyric(lyric.id)}
                  className={`cursor-pointer bg-gray-800 p-6 rounded-xl border transition text-left h-full ${
                    selectedLyric === lyric.id
                      ? "border-purple-500 ring-2 ring-purple-500"
                      : "border-gray-700 hover:border-purple-500"
                  }`}
                >
                  <h4 className="text-purple-400 font-bold mb-2">{lyric.title}</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-line font-mono leading-relaxed italic">
                    "{lyric.text}"
                  </p>
                </div>
              ))}
            </div>

            {/* Music Genre Selector */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
              <div className="flex items-center mb-4">
                <MusicIcon className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-white font-bold">Estilo Musical</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {musicGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => setSelectedMusicGenre(genre)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedMusicGenre === genre
                        ? "bg-purple-600 text-white"
                        : "bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Music Upload */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold mb-1">Agregar Música Personalizada</h3>
                  <p className="text-sm text-gray-400">Sube tu propia pista de audio (15 monedas)</p>
                  {customMusicFile && (
                    <p className="text-xs text-green-400 mt-2">✓ {customMusicFile.name}</p>
                  )}
                </div>
                <label className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-lg cursor-pointer transition flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Subir
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleCustomMusicUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handleRegenerateLyrics}
                className="text-yellow-500 hover:text-yellow-400 font-medium text-sm border border-yellow-500 rounded px-4 py-2 hover:bg-yellow-900 transition flex items-center"
              >
                <RotateCw className="w-4 h-4 mr-2" />
                Regenerar (-10 🪙)
              </button>
              <button
                onClick={handleNext}
                disabled={selectedLyric === null}
                className={`font-bold py-3 px-8 rounded flex items-center ${
                  selectedLyric === null
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-500"
                }`}
              >
                Siguiente <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-fade-in">
            {/* Instructions Card */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-6 mb-8 border-2 border-purple-500 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="text-2xl mr-3">📋</span>
                Instrucciones de Selección de Imágenes
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">1</span>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Selecciona en <strong>orden ascendente</strong> las imágenes. Solo puedes escoger <strong>6 imágenes gratis</strong> 
                    (si quieres más tendrá un costo extra de <span className="text-yellow-400 font-bold">5 monedas</span> por cada imagen adicional).
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">2</span>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Escoge las imágenes de tu agrado o puedes dar en el botón de <strong>Refresh</strong> y se cargarán nuevas imágenes 
                    (tendrá un costo extra de <span className="text-yellow-400 font-bold">10 monedas</span>).
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">3</span>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Una vez seleccionadas en orden ascendente, se tomarán las imágenes para crear el video con la música y estilo que seleccionaste.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="bg-purple-600 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0 mt-0.5">4</span>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    <strong>¡Disfruta de tu video!</strong> Descárgalo y compártelo en las redes sociales para que todos vean tu creación.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400">
                Imágenes seleccionadas: <strong className="text-white">{totalSelectedImages}</strong>/6 incluidas
                {imageHistory.length > 0 && (
                  <span className="ml-2 text-green-400">({imageHistory.length} guardadas de sesiones anteriores)</span>
                )}
              </div>
              <button
                onClick={handleRefreshImages}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg transition flex items-center text-sm"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh (-10 🪙)
              </button>
            </div>

            {/* Show previously selected images from history */}
            {imageHistory.length > 0 && (
              <div className="mb-6">
                <h4 className="text-white font-bold mb-3">Imágenes Guardadas ({imageHistory.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {imageHistory.map((img) => (
                    <div
                      key={img.id}
                      className="bg-gray-800 aspect-square rounded-lg border-2 border-green-500 flex items-center justify-center relative overflow-hidden"
                    >
                      <span className="text-4xl">{img.icon}</span>
                      <div className="absolute inset-0 bg-green-600 bg-opacity-30 flex items-center justify-center">
                        <Check className="text-white w-8 h-8 font-bold drop-shadow-md" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h4 className="text-white font-bold mb-3">Selecciona {6 - imageHistory.length > 0 ? 6 - imageHistory.length : 0} Imágenes Más</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
              {availableImages.map((img) => {
                const isSelected = selectedImages.includes(img.id);
                return (
                  <div
                    key={img.id}
                    onClick={() => handleImageSelect(img.id)}
                    className={`cursor-pointer bg-gray-800 aspect-square rounded-lg border transition flex items-center justify-center relative overflow-hidden group ${
                      isSelected ? "border-purple-500 ring-2 ring-purple-500" : "border-gray-700 hover:border-purple-400"
                    }`}
                  >
                    <span className="text-4xl group-hover:scale-110 transition">{img.icon}</span>
                    {isSelected && (
                      <div className="absolute inset-0 bg-purple-600 bg-opacity-40 flex items-center justify-center">
                        <Check className="text-white w-8 h-8 font-bold drop-shadow-md" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-xs text-yellow-500 mb-6">
              ⚠️ Selección extra: 5 monedas c/u | Refresh de imágenes: 10 monedas
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNext}
                disabled={totalSelectedImages === 0}
                className={`font-bold py-3 px-8 rounded flex items-center ${
                  totalSelectedImages === 0
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-500"
                }`}
              >
                Siguiente <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-fade-in">
            <div className="mb-4 text-gray-400">
              Ordena tus imágenes y elige el estilo de transición.
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center py-12">
              <div className="text-5xl text-gray-600 mb-4">📚</div>
              <p className="text-gray-400 mb-6">Tus imágenes se unirán secuencialmente.</p>

              <label className="block text-left text-xs font-bold text-gray-400 uppercase mb-2 w-full max-w-xs mx-auto">
                Estilo de Transición
              </label>
              <select className="w-full max-w-xs bg-gray-900 border border-gray-600 rounded p-3 text-white focus:border-purple-500 outline-none mx-auto block mb-6">
                <option>Desvanecimiento (Fade)</option>
                <option>Desplazamiento (Slide)</option>
                <option>Zoom Dinámico</option>
              </select>

              <button
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-10 rounded shadow-lg transform transition hover:scale-105"
              >
                Generar Video Final (-50 🪙)
              </button>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-fade-in">
            {isProcessing ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-white mb-2">Renderizando Video...</h3>
                <p className="text-gray-400">
                  Uniendo audios, imágenes y efectos con Filmora API...
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-full max-w-2xl mx-auto bg-black rounded-lg overflow-hidden border border-gray-700 shadow-2xl mb-8 relative">
                  <div className="aspect-video flex items-center justify-center bg-gray-900">
                    <Film className="text-gray-700 w-16 h-16" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition bg-black bg-opacity-60 cursor-pointer">
                      <div className="text-white text-6xl">▶️</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded">
                    📥 Descargar
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded"
                  >
                    Crear Otro Video
                  </button>
                </div>
                <p className="mt-4 text-green-400 text-sm flex items-center justify-center">
                  <Check className="w-4 h-4 mr-2" /> Guardado en Archivos
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {showModal && modalConfig && (
        <ConfirmModal
          cost={modalConfig.cost}
          message={modalConfig.message}
          onConfirm={modalConfig.onConfirm}
          onCancel={() => setShowModal(false)}
        />
      )}
    </AppLayout>
  );
}
