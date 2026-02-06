import { useEffect, useState } from "react";
import { useAuth } from "@getmocha/users-service/react";

export interface Mission {
  id: number;
  title: string;
  description: string;
  task_type: string;
  task_url: string | null;
  reward_coins: number;
  is_active: boolean;
  is_completed?: boolean;
  completed_at?: string | null;
}

export function useMissions() {
  const { user } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMissions = async () => {
    if (!user) {
      setMissions([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/missions");
      if (!response.ok) {
        console.error("Failed to fetch missions:", response.status);
        setMissions([]);
        return;
      }
      const data = await response.json();
      // Ensure data is an array
      if (Array.isArray(data)) {
        setMissions(data);
      } else {
        console.error("Missions data is not an array:", data);
        setMissions([]);
      }
    } catch (error) {
      console.error("Error fetching missions:", error);
      setMissions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [user]);

  const completeMission = async (missionId: number) => {
    if (!user) return;

    try {
      const response = await fetch("/api/missions/complete", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mission_id: missionId }),
      });
      
      if (response.ok) {
        await fetchMissions();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error completing mission:", error);
      return false;
    }
  };

  return { missions, isLoading, fetchMissions, completeMission };
}
