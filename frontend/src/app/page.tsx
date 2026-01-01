"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { NextUpCard } from "@/components/dashboard/NextUpCard";
import { RecommendedNext } from "@/components/dashboard/RecommendedNext";
import { RecentProblems } from "@/components/dashboard/RecentProblems";
import { MasterySidebar } from "@/components/dashboard/MasterySidebar";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          <WelcomeHeader userName="Alex" />
          <NextUpCard />
          <RecommendedNext />
          <RecentProblems />
        </div>

        {/* Right Sidebar Area */}
        <div className="lg:col-span-4">
          {/* Sticky positioning for the right sidebar if content is long */}
          <div className="sticky top-8">
            <MasterySidebar />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
