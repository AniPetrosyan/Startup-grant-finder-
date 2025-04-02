
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";

const DecisionTipsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const startupName = location.state?.startup || null;

  const handleBack = () => {
    navigate("/", { 
      state: { 
        fromInterviewTips: true,
        startup: startupName
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
            
            <h1 className="text-3xl font-bold mb-6">Decision Tips</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-[#5A8AA8]">1. Know Your Startup's Needs</h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Do you need funding, mentorship, networking, or credibility?</li>
                  <li>Are you looking to raise soon, or still validating the product?</li>
                  <li>Are you at MVP, pre-revenue, or scaling stage?</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-[#5A8AA8]">2. Geography & Industry Fit</h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Do you want to relocate or stay local?</li>
                  <li>Some accelerators are industry-specific (e.g., FinTech, EdTech).</li>
                  <li>Look at the startup alumni – are they similar to yours?</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-[#5A8AA8]">1. Mentorship & Network</h2>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>Who are the mentors? Are they experienced operators or just advisors?</li>
                  <li>Does the accelerator give warm intros to VCs, customers, or strategic partners?</li>
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

export default DecisionTipsPage;
