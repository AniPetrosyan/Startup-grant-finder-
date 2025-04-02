
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeScreen from "@/components/HomeScreen";
import PhoneFrame from "@/components/PhoneFrame";

const Index = () => {
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromApply) {
      setSelectedStartup(location.state.startup || null);
    } else if (location.state?.fromOpportunityDetail) {
      setSelectedStartup(location.state.startup || null);
    } else if (location.state?.fromInterviewTips) {
      setSelectedStartup(location.state.startup || null);
    }
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
        <HomeScreen
          selectedStartup={selectedStartup}
          onSelectStartup={handleSelectStartup}
        />
      </PhoneFrame>
    </div>
  );
};

export default Index;
