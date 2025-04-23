import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";

const DecisionTipsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const opportunity = location.state?.opportunity;

  const handleBack = () => {
    navigate(`/opportunity/${id}`, {
      state: {
        fromInterviewTips: true,
        activateDecision: true,
        industry: location.state?.industry,
        stage: location.state?.stage,
        location: location.state?.location,
        opportunity: opportunity
      }
    });
  };

  // Define content based on opportunity type
  const getContent = () => {
    if (opportunity?.type === "Grant") {
      return {
        title: `${opportunity?.title || 'Grant'} Decision Process`,
        description: "Understanding the grant decision process and next steps",
        sections: [
          {
            title: "Decision Timeline",
            content: [
              "Review period: 4-6 weeks",
              "Written notification of decision",
              "Detailed feedback provided",
              "Grant disbursement schedule"
            ]
          },
          {
            title: "If Approved",
            content: [
              "Sign grant agreement",
              "Submit required documentation",
              "Attend orientation session",
              "Set up reporting schedule",
              "Begin project implementation"
            ]
          },
          {
            title: "Next Steps",
            content: [
              "Complete compliance requirements",
              "Set up project milestones",
              "Establish reporting framework",
              "Schedule check-in meetings",
              "Plan community engagement"
            ]
          },
          {
            title: "If Not Approved",
            content: [
              "Request detailed feedback",
              "Review areas for improvement",
              "Consider alternative funding",
              "Refine project proposal",
              "Apply for next cycle"
            ]
          }
        ]
      };
    } else {
      // For investors/accelerators
      return {
        title: `${opportunity?.title || 'Investment'} Decision Process`,
        description: "Understanding the investment decision process and next steps",
        sections: [
          {
            title: "Decision Timeline",
            content: [
              "Term sheet within 1-2 weeks",
              "Due diligence period: 4-6 weeks",
              "Legal documentation: 2-3 weeks",
              "Closing and wire transfer"
            ]
          },
          {
            title: "If Term Sheet Received",
            content: [
              "Review terms carefully",
              "Legal counsel review",
              "Negotiate key terms",
              "Prepare due diligence documents",
              "Plan for closing requirements"
            ]
          },
          {
            title: "Next Steps",
            content: [
              "Complete due diligence checklist",
              "Finalize cap table",
              "Set up governance structure",
              "Plan fund deployment",
              "Schedule board meetings"
            ]
          },
          {
            title: "If Not Moving Forward",
            content: [
              "Ask for specific feedback",
              "Maintain relationship for future",
              "Review pitch and materials",
              "Strengthen weak points",
              "Continue fundraising efforts"
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
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleBack} className="p-1">
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#45625D] mb-2">{content.title}</h1>
              <p className="text-gray-600">{content.description}</p>
            </div>

            <div className="space-y-6">
              {content.sections.map((section, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4">
                  <h2 className="font-semibold mb-2">{section.title}</h2>
                  <ul className="space-y-2 text-gray-700">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default DecisionTipsPage;
