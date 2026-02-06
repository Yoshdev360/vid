import { useEffect, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";
import { Loader2 } from "lucide-react";
import AppLayout from "@/react-app/components/AppLayout";
import { useProfile } from "@/react-app/hooks/useProfile";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile } = useProfile();
  const [coinHistory, setCoinHistory] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetch("/api/coin-history")
        .then((res) => res.json())
        .then((data) => setCoinHistory(data));
    }
  }, [user]);

  const getInitials = () => {
    if (!user?.google_user_data?.name) return "U";
    const names = user.google_user_data.name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const lineChartData = {
    labels: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
    datasets: [
      {
        label: "Gasto",
        data: [10, 25, 5, 50, 20, 100, 15],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Videos", "Imágenes", "Música"],
    datasets: [
      {
        label: "Generados",
        data: [12, 45, 8],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        grid: { color: "#374151" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {getInitials()}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {user?.google_user_data?.name || "Usuario"}
            </h2>
            <p className="text-gray-400">{user?.email}</p>
            <div className="mt-2 inline-block bg-gray-800 px-3 py-1 rounded text-sm border border-gray-700">
              Plan: <span className="text-purple-400 font-bold">{profile?.plan || "Free"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Historial de Consumo (Monedas)</h3>
            <div className="relative w-full h-[300px]">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">Actividad Semanal</h3>
            <div className="relative w-full h-[300px]">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
