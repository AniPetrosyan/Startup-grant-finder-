import React, { useEffect, useState } from "react";
import StartupCard from "./StartupCard";
import ApplicationStep from "./ApplicationStep";
import BottomNavigation from "./BottomNavigation";
import { useNavigate, useLocation } from "react-router-dom";

interface HomeScreenProps {
  selectedStartup: string | null;
  onSelectStartup: (startup: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ selectedStartup, onSelectStartup }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewActive, setInterviewActive] = useState(false);
  const [decisionActive, setDecisionActive] = useState(false);

  // Check if coming back from various pages to activate appropriate steps
  useEffect(() => {
    // Reset states when no startup is selected
    if (!selectedStartup) {
      setInterviewActive(false);
      setDecisionActive(false);
      return;
    }

    // Check if we came from opportunity detail (step 1) or application page
    if (location.state?.fromOpportunityDetail || location.state?.fromApplication) {
      setInterviewActive(true);
      setDecisionActive(false);
    }
    
    // Check if we came from interview tips page (step 2)
    if (location.state?.fromInterviewTips) {
      setInterviewActive(true);
      if (location.state?.activateDecision) {
        setDecisionActive(true);
      }
    }
  }, [location, selectedStartup]);

  const handleStepClick = (step: number) => {
    if (step === 1 && selectedStartup) {
      // Convert the startup name to a URL-friendly format and navigate to the opportunity detail page
      const startupId = selectedStartup === "Venture Lab" ? "venture-lab" : "y-combinator";
      navigate(`/opportunity/${startupId}`, {
        state: { fromHome: true }
      });
    } else if (step === 2 && selectedStartup) {
      // Navigate to interview tips page
      navigate(`/interview-tips`, {
        state: { 
          fromHome: true,
          startup: selectedStartup
        }
      });
    } else if (step === 3 && selectedStartup && decisionActive) {
      // Navigate to decision tips page
      navigate(`/decision-tips`, {
        state: { 
          fromHome: true,
          startup: selectedStartup
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center">Home</h1>
        
        <h2 className="text-3xl font-bold mb-8 text-[#45625D]">Discover grants</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#45625D] mb-4">Your Eligibility</h3>
          <p className="font-medium mb-2 text-[#0D171C]">Stage: Pre-seed, Seed</p>
          <p className="text-[#3F7856] mb-2">Industry: Open</p>
          <p className="text-[#3F7856] mb-2">Location: San Francisco Bay Area</p>
          <p className="text-[#3F7856] mb-2">Incorporation Status: N/A</p>
        </div>
          
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#45625D] mb-4">Recommended Start-ups</h3>
          {selectedStartup ? (
            <p className="mb-4 text-gray-700">Press {selectedStartup === "Venture Lab" ? "Venture Lab" : "Y Combinator"} again to deselect:</p>
          ) : (
            <p className="mb-4 text-gray-700">Select one:</p>
          )}
          
          <StartupCard 
            name="Y Combinator"
            fundingAmount="$150k"
            progress="0%"
            applicationDate="2/15/2025"
            isSelected={selectedStartup === "Y Combinator"}
            onClick={() => onSelectStartup("Y Combinator")}
          />
          
          <StartupCard 
            name="Venture Lab"
            fundingAmount="$5k"
            progress="0%"
            applicationDate="2/15/2025"
            isSelected={selectedStartup === "Venture Lab"}
            onClick={() => onSelectStartup("Venture Lab")}
          />
        </div>
          
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#45625D] mb-4">Application Process</h3>
          {selectedStartup ? null : (
            <p className="mb-4 text-gray-700">You must select a start-up first.</p>
          )}
          <div className="bg-white rounded-md border">
            <div onClick={() => handleStepClick(1)} className="cursor-pointer">
              <ApplicationStep 
                number={1} 
                title="Apply online" 
                isActive={selectedStartup !== null} 
              />
            </div>
            <div onClick={() => handleStepClick(2)} className="cursor-pointer">
              <ApplicationStep 
                number={2} 
                title="Interview" 
                isActive={selectedStartup !== null && interviewActive} 
              />
            </div>
            <div onClick={() => handleStepClick(3)} className="cursor-pointer">
              <ApplicationStep 
                number={3} 
                title="Decision" 
                isActive={selectedStartup !== null && decisionActive} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation activeTab="Home" />
    </div>
  );
};

export default HomeScreen;
