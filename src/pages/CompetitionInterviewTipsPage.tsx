import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import ApplicationStep from "@/components/ApplicationStep";

const CompetitionInterviewTipsPage = () => {
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

  const content = {
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

export default CompetitionInterviewTipsPage; 