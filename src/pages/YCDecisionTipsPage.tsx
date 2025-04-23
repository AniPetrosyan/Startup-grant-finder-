import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const YCDecisionTipsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [industry, setIndustry] = React.useState<string | null>(null);
  const [stage, setStage] = React.useState<string | null>(null);
  const [area, setArea] = React.useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
  }, [location]);

  const handleBack = () => {
    navigate(`/yc-interview-tips/${id}`, {
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
              <h1 className="text-2xl font-bold text-[#45625D] mb-2">Y Combinator Decision Process</h1>
              <p className="text-gray-600">Understanding YC's decision timeline and next steps</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Decision Timeline</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Usually within 24 hours of interview</li>
                  <li>• Email notification for all decisions</li>
                  <li>• Batch starts about 2-4 weeks after</li>
                  <li>• Quick turnaround for paperwork</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">If Accepted</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• $500k investment ($125k for 7%)</li>
                  <li>• Immediate access to YC network</li>
                  <li>• Batch kickoff meetings</li>
                  <li>• Founder onboarding process</li>
                  <li>• Relocation planning (if needed)</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Next Steps</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Review and sign agreements</li>
                  <li>• Complete company setup</li>
                  <li>• Join YC internal platforms</li>
                  <li>• Connect with batch mates</li>
                  <li>• Prepare for batch start</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">If Not Accepted</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Continue building and growing</li>
                  <li>• Apply again in future batches</li>
                  <li>• Request feedback if available</li>
                  <li>• Explore other accelerators</li>
                  <li>• Stay connected via Startup School</li>
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

export default YCDecisionTipsPage; 