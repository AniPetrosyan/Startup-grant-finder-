import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useLocation } from "react-router-dom";

const YCEligibilityPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(`/apply/${id}`, {
      state: location.state
    });
  };

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6 overflow-y-auto">
            <button onClick={handleBack} className="p-1 mb-4">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <h1 className="text-3xl font-bold mb-6">Y Combinator Eligibility</h1>

            <div className="space-y-4">
              <p className="text-gray-600">To be eligible for Y Combinator, your startup should meet these criteria:</p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Have a functioning prototype or MVP</li>
                <li>Have at least 2 co-founders working full-time</li>
                <li>Be willing to relocate to Bay Area during the program</li>
                <li>Have a unique insight about an underserved market</li>
                <li>Show significant growth potential</li>
              </ul>
            </div>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default YCEligibilityPage; 