import AppLayout from "@/react-app/components/AppLayout";
import { Rocket, Coins, CheckCircle, ExternalLink, Clock, Gift } from "lucide-react";
import { useMissions } from "@/react-app/hooks/useMissions";
import { useProfile } from "@/react-app/hooks/useProfile";
import { useAuth } from "@getmocha/users-service/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useScrollAnimation } from "@/react-app/hooks/useScrollAnimation";

export default function MissionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { missions, isLoading, completeMission } = useMissions();
  const { fetchProfile } = useProfile();
  const [timeSpent, setTimeSpent] = useState(0);
  const [showReward, setShowReward] = useState<number | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);

      // Auto-complete time spent mission after 5 minutes
      if (elapsed >= 300) {
        const timeSpentMission = missions.find(
          m => m.task_type === "time_spent" && !m.is_completed
        );
        if (timeSpentMission) {
          handleCompleteMission(timeSpentMission.id, timeSpentMission.reward_coins);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [missions]);

  const handleCompleteMission = async (missionId: number, reward: number) => {
    const success = await completeMission(missionId);
    if (success) {
      setShowReward(reward);
      setTimeout(() => setShowReward(null), 3000);
      await fetchProfile();
    }
  };

  const handleSocialMission = (mission: any) => {
    if (mission.task_url) {
      window.open(mission.task_url, "_blank");
    }
    setTimeout(() => {
      handleCompleteMission(mission.id, mission.reward_coins);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="text-center mt-20">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4">Cargando misiones...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Rocket className="w-8 h-8 text-purple-500 mr-3" />
            <h2 className="text-3xl font-bold text-white">Misiones Diarias</h2>
          </div>
          <p className="text-gray-400">
            Completa misiones para ganar monedas gratis y desbloquear recompensas especiales
          </p>
        </div>

        {showReward !== null && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl shadow-2xl animate-pulse">
            <div className="flex items-center text-xl font-bold">
              <Gift className="w-6 h-6 mr-3" />
              ¡+{showReward} Monedas Ganadas!
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {missions.map((mission, index) => {
            return (
              <MissionCard 
                key={mission.id}
                mission={mission}
                index={index}
                timeSpent={timeSpent}
                handleCompleteMission={handleCompleteMission}
                handleSocialMission={handleSocialMission}
              />
            );
          })}
        </div>
                

        {missions.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <Rocket className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p>No hay misiones disponibles en este momento</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function MissionCard({ mission, index, timeSpent, handleCompleteMission, handleSocialMission }: any) {
  const { ref, isVisible } = useScrollAnimation();
  const isCompleted = mission.is_completed;
  const isTimeSpent = mission.task_type === "time_spent";
  const progress = isTimeSpent ? Math.min((timeSpent / 300) * 100, 100) : 0;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={ref}
      className={`bg-gray-800 rounded-xl p-6 border transition-all duration-700 ${
        isCompleted
          ? "border-green-600 bg-opacity-50"
          : "border-gray-700 hover:border-purple-500"
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{mission.title}</h3>
          <p className="text-sm text-gray-400">{mission.description}</p>
        </div>
        {isCompleted && (
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
        )}
      </div>

      {isTimeSpent && !isCompleted && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Tiempo en app</span>
            <span className="text-purple-400 font-mono">{formatTime(timeSpent)} / 5:00</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-yellow-400 font-bold">
          <Coins className="w-5 h-5 mr-2" />
          <span>+{mission.reward_coins}</span>
        </div>

        {!isCompleted && (
          <>
            {mission.task_type === "social_media" && (
              <button
                onClick={() => handleSocialMission(mission)}
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded transition flex items-center"
              >
                Ir <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            )}
            {mission.task_type === "time_spent" && (
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                En progreso
              </div>
            )}
            {mission.task_type === "create_video" && (
              <button
                onClick={() => window.location.href = "/"}
                className="bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded transition"
              >
                Crear Video
              </button>
            )}
          </>
        )}

        {isCompleted && (
          <span className="text-green-500 text-sm font-medium">Completada</span>
        )}
      </div>

      {isCompleted && mission.completed_at && (
        <div className="mt-3 text-xs text-gray-500">
          Completada el {new Date(mission.completed_at).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}
