import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";

const InterviewTipsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const startupName = location.state?.startup || null;

  const handleBack = () => {
    navigate("/home", { 
      state: { 
        fromInterviewTips: true,
        startup: startupName,
        activateDecision: true
      } 
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
            
            <h1 className="text-3xl font-bold mb-6">Interview Tips</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#45625D]">1. Skip the Rehearsals</h2>
                <p className="text-gray-800 mt-1">
                  Over-preparing doesn't help—it can make the interview awkward. No need for mock
                  interviews, presentations, or scripted answers. Interviews are conversations,
                  not performances.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-[#45625D]">2. Focus on Progress</h2>
                <p className="text-gray-800 mt-1">
                  The best way to stand out is by making real progress between applying and
                  interviewing—launch, improve your product, grow revenue. Show you can
                  move fast.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-[#45625D]">3. Clearly Explain Your Startup</h2>
                <p className="text-gray-800 mt-1">
                  Expect the first question: What does your company do? Answer in simple, jargon-free 
                  sentences. We prefer specific details over vague generalizations.
                </p>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-[#45625D]">4. Know Your Users & Metrics</h2>
                <p className="text-gray-800 mt-1">
                  If launched, be ready to discuss user behavior, growth, retention, and key
                  numbers. It's fine to have metrics written down to reference.
                </p>
              </div>
            </div>
          </div>
          
          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default InterviewTipsPage;
