import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const YCInterviewTipsPage = () => {
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
    navigate(`/apply/${id}`, {
      state: {
        fromInterviewTips: true,
        industry: industry,
        stage: stage,
        location: area,
        opportunity: location.state?.opportunity
      }
    });
  };

  const handleNext = () => {
    navigate(`/yc-decision-tips/${id}`, {
      state: {
        industry: industry,
        stage: stage,
        location: area
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
              <h1 className="text-2xl font-bold text-[#45625D] mb-2">Y Combinator Interview Tips</h1>
              <p className="text-gray-600">Prepare for your YC interview with these key insights</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Interview Format</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• 10-minute interview with YC partners</li>
                  <li>• Rapid-fire questions about your startup</li>
                  <li>• Usually conducted via video call</li>
                  <li>• All founders must be present</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Key Focus Areas</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Your team and why you're the right founders</li>
                  <li>• Your product and what makes it unique</li>
                  <li>• Market size and growth potential</li>
                  <li>• Current traction and metrics</li>
                  <li>• Business model and monetization</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Common Questions</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• "What are you building and why?"</li>
                  <li>• "How do you know people want this?"</li>
                  <li>• "What's your growth like?"</li>
                  <li>• "Who are your competitors?"</li>
                  <li>• "How will you make money?"</li>
                </ul>
              </div>

              <div className="bg-gray-100 rounded-lg p-4">
                <h2 className="font-semibold mb-2">Tips for Success</h2>
                <ul className="space-y-2 text-gray-700">
                  <li>• Be concise and direct in your answers</li>
                  <li>• Know your metrics cold</li>
                  <li>• Show passion and deep knowledge</li>
                  <li>• Be honest about challenges</li>
                  <li>• Practice with your co-founders</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={handleNext} 
              className="w-full mt-8 bg-[#E4F2E2] text-gray-900 font-medium py-3 rounded-lg hover:bg-[#d3e6d0] transition-colors"
            >
              Next: Decision Tips
            </button>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default YCInterviewTipsPage; 