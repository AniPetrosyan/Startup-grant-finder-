import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const VentureLabEligibilityPage = () => {
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
    navigate(`/apply/${id}`, {
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
              <h1 className="text-2xl font-bold text-[#45625D] mb-2">Venture Lab Eligibility</h1>
              <p className="text-gray-600">Check if your startup qualifies for Venture Lab</p>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-[#45625D] mb-4">1. Founder Requirements</h2>
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Solo founders or small teams welcome</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Must be committed to working on the startup during the program</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Open to first-time entrepreneurs</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#45625D] mb-4">2. Stage & Focus</h2>
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Early-stage startups (idea to prototype stage)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Focus on innovation and social impact</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>No prior funding requirements</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#45625D] mb-4">3. Program Participation</h2>
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Ability to attend weekly workshops and mentoring sessions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Commitment to program milestones and deliverables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Willingness to engage with the Venture Lab community</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#45625D] mb-4">4. Location & Availability</h2>
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Remote participation available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Flexible schedule options to accommodate different time zones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Access to workspace if located in partner cities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">
                  Note: Venture Lab focuses on supporting early-stage founders with innovative ideas and a 
                  commitment to learning and growth. We value diversity and welcome applications from 
                  underrepresented founders.
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

export default VentureLabEligibilityPage; 