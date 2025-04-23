
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/use-toast";
import ApplicationStep from "@/components/ApplicationStep";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const ApplicationChecklistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [industry, setIndustry] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const location = useLocation();

  // Update the states based on the location state
  useEffect(() => {
    // Set the industry, stage, and area from the location state
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
  }, [location]);

  const handleCheck = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleBack = () => {
    const startupName = id === "venture-lab" ? "Venture Lab" : "Y Combinator";

    navigate(`/opportunity/${id}`, {
      state: {
        industry: industry,
        stage: stage,
        location: area
      }
    });

    toast({
      title: "Progress saved",
      description: "Your application progress has been saved.",
    });
  };

  const programName = id === "venture-lab" ? "Venture Lab" : "Y Combinator";

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6 overflow-y-auto">
            <button onClick={handleBack} className="p-1 mb-4">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <h1 className="text-3xl font-bold mb-8">
              Apply Checklist:<br />
              {programName}
            </h1>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="item-1"
                  className="mt-1"
                  checked={checkedItems["item-1"] || false}
                  onCheckedChange={() => handleCheck("item-1")}
                />
                <div>
                  <label htmlFor="item-1" className="text-base font-medium cursor-pointer">
                    Confirm your startup meets eligibility criteria <span className="text-green-600">here</span>.
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="item-2"
                  className="mt-1"
                  checked={checkedItems["item-2"] || false}
                  onCheckedChange={() => handleCheck("item-2")}
                />
                <div>
                  <label htmlFor="item-2" className="text-base font-medium cursor-pointer">
                    Prepare startup information
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="item-3"
                  className="mt-1"
                  checked={checkedItems["item-3"] || false}
                  onCheckedChange={() => handleCheck("item-3")}
                />
                <div>
                  <label htmlFor="item-3" className="text-base font-medium cursor-pointer">
                    Assemble supporting documents
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="item-4"
                  className="mt-1"
                  checked={checkedItems["item-4"] || false}
                  onCheckedChange={() => handleCheck("item-4")}
                />
                <div>
                  <label htmlFor="item-4" className="text-base font-medium cursor-pointer">
                    Review and proofread
                  </label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="item-5"
                  className="mt-1"
                  checked={checkedItems["item-5"] || false}
                  onCheckedChange={() => handleCheck("item-5")}
                />
                <div>
                  <label htmlFor="item-5" className="text-base font-medium cursor-pointer">
                    Submit and follow up
                  </label>
                </div>


              </div>
              <div className="bg-white rounded-md border">
                <div onClick={() => navigate(`/interview-tips/${id}`, {
                  state: {
                    industry: industry,
                    stage: stage,
                    location: area
                  }
                })} className="cursor-pointer">
                  <ApplicationStep
                    number={2}
                    title="Interview"
                    isActive={true}
                  />
                </div>

              </div>
            </div>
          </div>

          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame >
    </div >
  );
};

export default ApplicationChecklistPage;
