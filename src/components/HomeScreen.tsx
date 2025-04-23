import React, { useEffect, useState } from "react";
import StartupCard from "./StartupCard";
import ApplicationStep from "./ApplicationStep";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";

interface HomeScreenProps {
  selectedStartup: string | null;
  onSelectStartup: (startup: string) => void;
  industry: string | null;
  stage: string | null;
  area: string | null;
  profile?: {
    teamSize: string;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ selectedStartup, onSelectStartup, industry, stage, area, profile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewActive, setInterviewActive] = useState(false);
  const [decisionActive, setDecisionActive] = useState(false);

  // Predefined opportunity data
  const YC_OPPORTUNITY = {
    id: "y-combinator",
    title: "Y Combinator",
    amount: "$500,000",
    progress: "0%",
    deadline: "4/23/2025",
    type: "Accelerator",
    stage: "Seed",
    industry: "Technology",
    teamSize: "2-5",
    description: "Y Combinator is a startup accelerator that invests in a large number of startups twice a year. The program offers startups $500k and 3 months of intensive support while working on their startup idea."
  };

  const VENTURE_LAB_OPPORTUNITY = {
    id: "venture-lab",
    title: "Venture Lab",
    amount: "$5,000",
    progress: "0%",
    deadline: "4/28/2025",
    type: "Accelerator",
    stage: "Pre-seed",
    industry: "Technology",
    teamSize: "1-2",
    description: "Venture Lab is an early-stage startup program focused on helping entrepreneurs validate their ideas and build their first MVP. The program provides initial funding and mentorship."
  };

  // Check if coming back from various pages to activate appropriate steps
  useEffect(() => {
    if (location.state?.allStepsCompleted) {
      setInterviewActive(true);
      setDecisionActive(true);
      return;
    }

    if (selectedStartup) {
      // Check if we came from opportunity detail (step 1) or application page
      if (location.state?.fromOpportunityDetail || location.state?.fromApplicationChecklistPage) {
        setInterviewActive(true);
      }

      // Check if we came from interview tips page (step 2)
      if (location.state?.fromInterviewTips) {
        setInterviewActive(true);
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
    <div className="h-full bg-white">
      <div className="bg-[#E4F2E2]">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4 text-center">Home</h1>
          <h2 className="text-2xl font-bold mb-6 text-[#45625D]">Discover grants</h2>

          <div className="border bg-white p-6 rounded-xl mb-6">
            <h3 className="text-xl font-semibold text-[#45625D] mb-4">Your Eligibility</h3>
            <p className="font-medium mb-2 text-[#0D171C]">Stage: {stage}</p>
            <p className="font-medium mb-2 text-[#0D171C]">Industry: {industry}</p>
            <p className="font-medium mb-2 text-[#0D171C]">Location: {area}</p>
            <p className="font-medium text-[#0D171C]">Team Size: {profile?.teamSize || "Not specified"}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#45625D]">Recommended Grants</h3>
          <p className="text-gray-700">Select one:</p>

          <StartupCard
            name="Y Combinator"
            fundingAmount="$500k"
            progress="0%"
            applicationDate={YC_OPPORTUNITY.deadline}
            isSelected={selectedStartup === "Y Combinator"}
            onClick={() => navigate("/opportunity/y-combinator", {
              state: {
                opportunity: YC_OPPORTUNITY,
                industry: industry,
                stage: stage,
                location: area
              }})}
          />

          <StartupCard
            name="Venture Lab"
            fundingAmount="$5k"
            progress="0%"
            applicationDate="4/28/2025"
            isSelected={selectedStartup === "Venture Lab"}
            onClick={() => navigate("/opportunity/venture-lab", {
              state: {
                opportunity: VENTURE_LAB_OPPORTUNITY,
                industry: industry,
                stage: stage,
                location: area
              }})}
          />

          <div onClick={() => handleClick()} className="border rounded-xl p-4 cursor-pointer transition-colors hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-l">More Recommended Grants</h3>
              <div className="ml-2">
                <ArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
