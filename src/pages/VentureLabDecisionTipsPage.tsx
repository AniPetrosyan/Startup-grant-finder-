import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const VentureLabDecisionTipsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [industry, setIndustry] = React.useState<string | null>(null);
  const [stage, setStage] = React.useState<string | null>(null);
  const [area, setArea] = React.useState<string | null>(null);
  const location = useLocation();

  // Update the states based on the location state
  useEffect(() => {
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
  }, [location]);

  const handleBack = () => {
    navigate(`/venture-lab-interview-tips/${id}`, {
      state: {
        industry: industry,
        stage: stage,
        location: area,
        opportunity: location.state?.opportunity
      }
    });
  };

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
              <h1 className="text-2xl font-bold text-[#45625D] mb-2">Venture Lab Decision Process</h1>
              <p className="text-gray-600">Understanding the Venture Lab selection process and next steps</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Decision Timeline</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Review within 1 week of interview</li>
                  <li>• Email notification of decision</li>
                  <li>• Program starts next month</li>
                  <li>• Flexible start dates available</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">If Accepted</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• $5,000 initial funding</li>
                  <li>• Access to mentorship program</li>
                  <li>• Workspace access</li>
                  <li>• Weekly workshops</li>
                  <li>• Resource library access</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Next Steps</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Complete onboarding forms</li>
                  <li>• Schedule mentor matching</li>
                  <li>• Set program milestones</li>
                  <li>• Join community platform</li>
                  <li>• Attend orientation</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">If Not Accepted</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Detailed feedback provided</li>
                  <li>• Reapplication possible in 3 months</li>
                  <li>• Access to basic resources</li>
                  <li>• Join community events</li>
                  <li>• Consider other programs</li>
                </ul>
              </div>
            </div>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default VentureLabDecisionTipsPage; 