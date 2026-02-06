import { useEffect, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import AppLayout from "@/react-app/components/AppLayout";
import { useProfile } from "@/react-app/hooks/useProfile";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { 
  User, Mail, Calendar, Crown, Coins, Video, TrendingUp, 
  Download, Share2, Award, Target, Camera, Edit2
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function EnhancedProfilePage() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [coinHistory, setCoinHistory] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    videos_created: 0,
    images_generated: 0,
    songs_created: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);

  const handleNameEdit = () => {
    setEditedName(user?.google_user_data?.name || "");
    setShowNameModal(true);
  };

  const handleSaveName = async () => {
    // In a real app, this would save to the backend
    alert(`Nombre actualizado a: ${editedName}`);
    setShowNameModal(false);
  };

  useEffect(() => {
    if (user) {
      fetch("/api/coin-history")
        .then((res) => res.json())
        .then((data) => setCoinHistory(data))
        .catch(() => setCoinHistory([]));

      fetch("/api/activities")
        .then((res) => res.json())
        .then((data) => setActivities(data))
        .catch(() => setActivities([]));

      fetch("/api/stats")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch(() => {});
    }
  }, [user]);

  const getInitials = () => {
    if (!user?.google_user_data?.name) return "U";
    const names = user.google_user_data.name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const lineChartData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [
      {
        label: "Monedas Gastadas",
        data: [10, 25, 5, 50, 20, 100, 15],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Monedas Ganadas",
        data: [20, 10, 15, 5, 30, 10, 25],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Videos", "Imágenes", "Música"],
    datasets: [
      {
        label: "Contenido Generado",
        data: [stats.videos_created, stats.images_generated, stats.songs_created],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Videos HD", "Videos SD", "Regeneraciones", "Extras"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: true,
        labels: {
          color: "#9ca3af",
        }
      },
    },
    scales: {
      y: {
        grid: { color: "#374151" },
        ticks: { color: "#9ca3af" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#9ca3af" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#9ca3af",
        },
      },
    },
  };

  const achievements = [
    { id: 1, title: "Primer Video", description: "Creaste tu primer video", unlocked: true, icon: "🎬" },
    { id: 2, title: "Creador Frecuente", description: "10 videos creados", unlocked: true, icon: "🌟" },
    { id: 3, title: "Maestro de IA", description: "50 videos creados", unlocked: false, icon: "🏆" },
    { id: 4, title: "Coleccionista", description: "Usaste todos los estilos", unlocked: false, icon: "🎨" },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-xl p-8 mb-8 border border-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-4 border-white">
                  {getInitials()}
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 rounded-full p-2 shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                  <h2 className="text-3xl font-bold text-white">
                    {user?.google_user_data?.name || "Usuario"}
                  </h2>
                  <button
                    onClick={handleNameEdit}
                    className="text-white hover:text-purple-300"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-300 mb-3">
                  <Mail className="w-4 h-4 mr-2" />
                  <p>{user?.email}</p>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <div className="bg-gray-900 bg-opacity-70 px-4 py-2 rounded-lg border border-purple-500 flex items-center">
                    <Crown className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-purple-400 font-bold">{profile?.plan || "Free"}</span>
                  </div>
                  <div className="bg-gray-900 bg-opacity-70 px-4 py-2 rounded-lg border border-yellow-500 flex items-center">
                    <Coins className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-yellow-100 font-bold">{profile?.coins || 0} monedas</span>
                  </div>
                  <div className="bg-gray-900 bg-opacity-70 px-4 py-2 rounded-lg border border-blue-500 flex items-center">
                    <Video className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-100 font-bold">{stats.videos_created} videos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
            <Video className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{stats.videos_created}</div>
            <div className="text-gray-400 text-sm">Videos Creados</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
            <Camera className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{stats.images_generated}</div>
            <div className="text-gray-400 text-sm">Imágenes Generadas</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
            <Coins className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{profile?.coins || 0}</div>
            <div className="text-gray-400 text-sm">Monedas Disponibles</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
            <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">85%</div>
            <div className="text-gray-400 text-sm">Tasa de Éxito</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Actividad de Monedas (Última Semana)</h3>
            <div className="relative w-full h-[300px]">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Uso de Monedas</h3>
            <div className="relative w-full h-[300px]">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Contenido Generado</h3>
            <div className="relative w-full h-[300px]">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Actividad Reciente</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {activities.length > 0 ? (
                activities.map((activity: any, index: number) => {
                  const activityIcons: Record<string, string> = {
                    login: "🔐",
                    register: "👤",
                    video_created: "🎬",
                    coins_transaction: "💰",
                    mission_completed: "🎯",
                    profile_updated: "✏️",
                    file_uploaded: "📁",
                    settings_changed: "⚙️"
                  };
                  const icon = activityIcons[activity.activity_type] || "📌";
                  
                  return (
                    <div key={index} className="flex items-start justify-between p-3 bg-gray-900 rounded-lg hover:bg-gray-850 transition">
                      <div className="flex items-start flex-1">
                        <span className="text-2xl mr-3 flex-shrink-0">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium">{activity.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(activity.created_at).toLocaleString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No hay actividad reciente</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center mb-6">
            <Award className="w-6 h-6 text-yellow-400 mr-3" />
            <h3 className="text-lg font-bold text-white">Logros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border text-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-yellow-900 to-orange-900 border-yellow-600'
                    : 'bg-gray-900 border-gray-700 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="text-white font-bold text-sm mb-1">{achievement.title}</h4>
                <p className="text-gray-400 text-xs">{achievement.description}</p>
                {achievement.unlocked && (
                  <div className="mt-2 text-yellow-400 text-xs font-bold">
                    ✓ DESBLOQUEADO
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Name Edit Modal */}
        {showNameModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-600 mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Cambiar Nombre</h3>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:border-purple-500 outline-none mb-6"
                placeholder="Nuevo nombre"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="px-4 py-2 rounded text-gray-400 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2 rounded bg-purple-600 text-white font-bold hover:bg-purple-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
