"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { NextUpCard } from "@/components/dashboard/NextUpCard";
import { RecommendedNext } from "@/components/dashboard/RecommendedNext";
import { RecentProblems } from "@/components/dashboard/RecentProblems";
import { MasterySidebar } from "@/components/dashboard/MasterySidebar";
import { apiClient } from "@/lib/api";

interface UserData {
  email: string;
  full_name: string;
  points: number;
  streak_days: number;
  mastery_score: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiClient.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <WelcomeHeader userName={user?.full_name || "Learner"} />
          <NextUpCard />
          <RecommendedNext />
          <RecentProblems />
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-4">
          {/* Sticky positioning for the right sidebar if content is long */}
          <div className="sticky top-8">
            <MasterySidebar 
              points={user?.points || 0}
              streak={user?.streak_days || 0}
              mastery={user?.mastery_score || 0}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
