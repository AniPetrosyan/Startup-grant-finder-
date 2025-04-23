import React, { useEffect, useState } from "react";
import StartupCard from "./StartupCard";
import ApplicationStep from "./ApplicationStep";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface HomeScreenProps {
  selectedStartup: string | null;
  onSelectStartup: (startup: string) => void;
  industry: string | null;
  stage: string | null;
  area: string | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ selectedStartup, onSelectStartup, industry, stage, area }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewActive, setInterviewActive] = useState(false);
  const [decisionActive, setDecisionActive] = useState(false);

  // Check if coming back from various pages to activate appropriate steps
  useEffect(() => {
    if (selectedStartup) {
      // Check if we came from opportunity detail (step 1) or application page
      if (location.state?.fromOpportunityDetail || location.state?.fromApplicationChecklistPage) {
        setInterviewActive(true);
      }

      // Check if we came from interview tips page (step 2)
      if (location.state?.fromInterviewTips) {
        setInterviewActive(true);
        
//     Reset states when no startup is selected
//     if (!selectedStartup) {
//       setInterviewActive(false);
//       setDecisionActive(false);
//       return;
//     }

//     // Check if we came from opportunity detail (step 1) or application page
//     if (location.state?.fromOpportunityDetail || location.state?.fromApplication) {
//       setInterviewActive(true);
//       setDecisionActive(false);
//     }
    
//     // Check if we came from interview tips page (step 2)
//     if (location.state?.fromInterviewTips) {
//       setInterviewActive(true);
//       if (location.state?.activateDecision) {

        setDecisionActive(true);
      }
    }
  }, [location, selectedStartup]);

  // const handleStepClick = (step: number) => {
  //   if (step === 1 && selectedStartup) {
  //     // Convert the startup name to a URL-friendly format and navigate to the opportunity detail page
  //     const startupId = selectedStartup === "Venture Lab" ? "venture-lab" : "y-combinator";
  //     navigate(`/opportunity/${startupId}`, {
  //       state: { fromHome: true }
  //     });
  //   } else if (step === 2 && selectedStartup) {
  //     // Navigate to interview tips page
  //     navigate(`/interview-tips`, {
  //       state: {
  //         fromHome: true,
  //         startup: selectedStartup
  //       }
  //     });
  //   } else if (step === 3 && selectedStartup && decisionActive) {
  //     // Navigate to decision tips page
  //     navigate(`/decision-tips`, {
  //       state: {
  //         fromHome: true,
  //         startup: selectedStartup
  //       }
  //     });
  //   }
  // };

  const handleClick = () => {
    navigate("/explore", {
      state: {
        industry: industry,
        stage: stage,
        location: area,
        fromHome: true,
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div>
        <div className="flex-1 p-6 overflow-y-auto bg-[#E4F2E2]">
          <h1 className="text-xl font-bold mb-4 text-center">Home</h1>

          <h2 className="text-2xl font-bold mb-6 text-[#45625D]">Discover grants</h2>

          <div className="">
            <div className="border bg-[white] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#45625D] mb-4">Your Eligibility</h3>
              <p className="font-medium mb-2 text-[#0D171C]">Stage: {stage}</p>
              <p className="font-medium mb-2 text-[#0D171C]">Industry: {industry}</p>
              <p className="font-medium mb-2 text-[#0D171C]">Location: {area}</p>
              <p className="font-medium text-[#0D171C]">Incorporation Status: N/A</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="">
            <h3 className="text-xl font-semibold text-[#45625D] mb-2">Recommended Grants</h3>
            <p className="mb-4 text-gray-700">Select one:</p>

            <StartupCard
              name="Y Combinator"
              fundingAmount="$150k"
              progress="0%"
              applicationDate="2/15/2025"
              isSelected={selectedStartup === "Y Combinator"}
              onClick={() => navigate("/opportunity/y-combinator", {
                state: {
                    industry: industry,
                    stage: stage,
                    location: area
                }})}
            />

            <StartupCard
              name="Venture Lab"
              fundingAmount="$5k"
              progress="0%"
              applicationDate="2/15/2025"
              isSelected={selectedStartup === "Venture Lab"}
              onClick={() => navigate("/opportunity/venture-lab", {
                state: {
                    industry: industry,
                    stage: stage,
                    location: area
                }})}
            />

            <div onClick={() => handleClick()} className="border rounded-xl p-4 mb-4 cursor-pointer transition-colors bg-[#F7FAFA]">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-l">More Recommended Grants</h3>
                <div className="ml-2">
                  <ArrowRight></ArrowRight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
