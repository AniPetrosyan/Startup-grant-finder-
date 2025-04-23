
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeScreen from "@/components/HomeScreen";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromApply) {
      setSelectedStartup(location.state.startup || null);
    } else if (location.state?.fromOpportunityDetail) {
      setSelectedStartup(location.state.startup || null);
    } else if (location.state?.fromInterviewTips) {
      setSelectedStartup(location.state.startup || null);
    }

    // Set the industry, stage, and area from the location state
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
  }, [location]);

  const handleSelectStartup = (startup: string) => {
    if (selectedStartup === startup) {
      setSelectedStartup(null);
    } else {
      setSelectedStartup(startup);
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
      <div className="overflow-auto">
        <HomeScreen
          selectedStartup={selectedStartup}
          onSelectStartup={handleSelectStartup}
          industry={industry}
          stage={stage}
          area={area}
        />
        </div>
        <BottomNavigation activeTab="Home" />
      </PhoneFrame>
    </div>
  );
};

export default Index;
