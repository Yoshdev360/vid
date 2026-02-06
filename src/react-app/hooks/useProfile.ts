import { useEffect, useState } from "react";
import type { UserProfile } from "@/shared/types";
import { useAuth } from "@getmocha/users-service/react";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateCoins = async (amount: number, description: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/profile/coins", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount, description }),
      });
      const data = await response.json();
      setProfile(prev => prev ? { ...prev, coins: data.coins } : null);
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  return { profile, isLoading, fetchProfile, updateCoins };
}
