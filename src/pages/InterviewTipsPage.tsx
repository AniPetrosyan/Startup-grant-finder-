import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import ApplicationStep from "@/components/ApplicationStep";

const InterviewTipsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const opportunity = location.state?.opportunity;

  const handleBack = () => {
    navigate(`/apply/${id}`, {
      state: {
        industry: location.state?.industry,
        stage: location.state?.stage,
        location: location.state?.location,
        opportunity: opportunity
      }
    });
  };

  const handleNext = () => {
    navigate(`/decision-tips/${id}`, {
      state: {
        industry: location.state?.industry,
        stage: location.state?.stage,
        location: location.state?.location,
        opportunity: opportunity
      }
    });
  };

  // Define content based on opportunity type
  const getContent = () => {
    switch (opportunity?.type) {
      case "Grant":
        return {
          title: `${opportunity?.title || 'Grant'} Interview Tips`,
          description: `Prepare for your grant interview with these guidelines`,
          sections: [
            {
              title: "Interview Preparation",
              content: [
                "Review your project proposal thoroughly",
                "Prepare clear budget justification",
                "Gather supporting data and evidence",
                "Practice explaining social impact",
                "Prepare project timeline and milestones"
              ]
            },
            {
              title: "Key Focus Areas",
              content: [
                "Project feasibility and sustainability",
                "Budget allocation and management",
                "Expected community impact",
                "Risk management strategy",
                "Long-term project viability"
              ]
            },
            {
              title: "Common Topics",
              content: [
                "Community benefit and engagement",
                "Project methodology and approach",
                "Resource allocation and timeline",
                "Impact measurement metrics",
                "Future funding plans"
              ]
            }
          ]
        };
      case "Competition":
        return {
          title: `${opportunity?.title || 'Competition'} Interview Tips`,
          description: `Prepare for your competition pitch with these guidelines`,
          sections: [
            {
              title: "Pitch Preparation",
              content: [
                "Perfect your pitch timing (usually 5-10 minutes)",
                "Prepare compelling demo/prototype",
                "Create engaging presentation slides",
                "Practice Q&A scenarios",
                "Research past winners' approaches"
              ]
            },
            {
              title: "Key Focus Areas",
              content: [
                "Innovation and uniqueness",
                "Market opportunity and validation",
                "Technical feasibility",
                "Competitive advantage",
                "Growth and scaling strategy"
              ]
            },
            {
              title: "Common Topics",
              content: [
                "Problem-solution fit",
                "Technology differentiation",
                "Market size and potential",
                "Team capabilities and background",
                "Implementation roadmap"
              ]
            }
          ]
        };
      default: // For Investors/VCs
        return {
          title: `${opportunity?.title || 'Investor'} Interview Tips`,
          description: `Prepare for your investor pitch with these guidelines`,
          sections: [
            {
              title: "Interview Preparation",
              content: [
                "Perfect your elevator pitch",
                "Know your financial projections",
                "Prepare market analysis",
                "Have your metrics ready",
                "Research potential questions"
              ]
            },
            {
              title: "Key Focus Areas",
              content: [
                "Business model and revenue streams",
                "Market opportunity and size",
                "Competitive advantage",
                "Growth strategy and scalability",
                "Use of funds and runway"
              ]
            },
            {
              title: "Common Topics",
              content: [
                "Traction and current metrics",
                "Team background and expertise",
                "Customer acquisition strategy",
                "Unit economics",
                "Exit strategy"
              ]
            }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6 overflow-y-auto">
            <button onClick={handleBack} className="p-1 mb-4">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <h1 className="text-2xl font-bold text-[#45625D] mb-2">
              {content.title}
            </h1>
            <p className="text-gray-600 mb-6">
              {content.description}
            </p>

            <div className="space-y-8">
              {content.sections.map((section, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h2 className="text-xl font-semibold text-[#45625D] mb-4">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2 text-[#45625D]">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div onClick={handleNext} className="cursor-pointer mt-8">
              <ApplicationStep
                number={3}
                title="Decision Tips"
                isActive={true}
              />
            </div>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default InterviewTipsPage;
