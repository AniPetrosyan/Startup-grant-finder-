import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/use-toast";
import ApplicationStep from "@/components/ApplicationStep";
import { useLocation } from "react-router-dom";

const ApplicationChecklistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
  const [industry, setIndustry] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [opportunity, setOpportunity] = useState<any>(null);
  const location = useLocation();

  // Load checked items from localStorage on component mount
  useEffect(() => {
    const savedCheckedItems = localStorage.getItem(`checklist-${id}`);
    if (savedCheckedItems) {
      setCheckedItems(JSON.parse(savedCheckedItems));
    }
  }, [id]);

  // Update the states based on the location state
  useEffect(() => {
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
    setOpportunity(location.state?.opportunity || null);
  }, [location]);

  const handleCheck = (itemId: string) => {
    const newCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };
    setCheckedItems(newCheckedItems);
    
    // Save to localStorage
    localStorage.setItem(`checklist-${id}`, JSON.stringify(newCheckedItems));
    
    // Show toast notification
    toast({
      title: "Progress saved",
      description: "Your checklist progress has been saved.",
    });
  };

  const handleBack = () => {
    // Save progress before navigating back
    const progress = {
      checkedItems,
      allStepsCompleted: checkedItems.length > 0 && checkedItems.every((item: boolean) => item === true)
    };
    
    // For Y Combinator and Venture Lab, ensure we use the correct ID and data
    const opportunityId = id === "y-combinator" ? "y-combinator" : 
                         id === "venture-lab" ? "venture-lab" : 
                         opportunity?.id;

    localStorage.setItem(`checklist-progress-${opportunityId}`, JSON.stringify(progress));

    // Special handling for Y Combinator and Venture Lab
    if (id === "y-combinator") {
      navigate(`/opportunity/${id}`, {
        state: {
          opportunity: {
            id: "y-combinator",
            title: "Y Combinator",
            amount: "$500,000",
            deadline: "4/23/2025",
            type: "Accelerator",
            stage: "Seed",
            industry: "Technology",
            teamSize: "2-5",
            description: "Y Combinator is a startup accelerator that invests in a large number of startups twice a year. The program offers startups $500k and 3 months of intensive support while working on their startup idea."
          },
          industry,
          stage,
          location: area,
          allStepsCompleted: checkedItems.length > 0 && checkedItems.every((item: boolean) => item === true),
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: location.state?.fromDecisionTips || false
        }
      });
    } else if (id === "venture-lab") {
      navigate(`/opportunity/${id}`, {
        state: {
          opportunity: {
            id: "venture-lab",
            title: "Venture Lab",
            amount: "$5000",
            deadline: "4/28/2025",
            type: "Accelerator",
            stage: "Pre-seed",
            industry: "Technology",
            teamSize: "1-2",
            description: "Venture Lab is an early-stage startup program focused on helping entrepreneurs validate their ideas and build their first MVP. The program provides initial funding and mentorship."
          },
          industry,
          stage,
          location: area,
          allStepsCompleted: checkedItems.length > 0 && checkedItems.every((item: boolean) => item === true),
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: location.state?.fromDecisionTips || false
        }
      });
    } else {
      // For other opportunities
      navigate(`/opportunity/${opportunityId}`, {
        state: {
          opportunity: {
            ...opportunity,
            id: opportunityId
          },
          industry,
          stage,
          location: area,
          allStepsCompleted: checkedItems.length > 0 && checkedItems.every((item: boolean) => item === true),
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: location.state?.fromDecisionTips || false
        }
      });
    }
  };

  const handleEligibilityClick = () => {
    if (id === "y-combinator") {
      navigate(`/yc-eligibility/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity
        }
      });
    } else if (id === "venture-lab") {
      navigate(`/venture-lab-eligibility/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity
        }
      });
    }
  };

  const handleInterviewClick = () => {
    // Special cases for Y Combinator and Venture Lab
    if (id === "y-combinator") {
      navigate(`/yc-interview-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: location.state?.fromDecisionTips || false
        }
      });
      return;
    }
    
    if (id === "venture-lab") {
      navigate(`/venture-lab-interview-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: location.state?.fromDecisionTips || false
        }
      });
      return;
    }

    // For all other opportunities, use their type to determine the path
    const type = opportunity?.type?.toLowerCase() || 'grant';
    let interviewPath;

    if (type === 'competition') {
      interviewPath = '/competition-interview-tips';
    } else if (type === 'investor') {
      interviewPath = '/investor-interview-tips';
    } else if (type === 'accelerator') {
      interviewPath = '/investor-interview-tips';
    } else {
      interviewPath = '/interview-tips';
    }

    navigate(`${interviewPath}/${id}`, {
      state: {
        industry: industry,
        stage: stage,
        location: area,
        opportunity: opportunity,
        fromApplication: true,
        fromInterviewTips: true,
        fromDecisionTips: location.state?.fromDecisionTips || false
      }
    });
  };

  const handleDecisionClick = () => {
    if (id === "y-combinator") {
      navigate(`/yc-decision-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: true
        }
      });
    } else if (id === "venture-lab") {
      navigate(`/venture-lab-decision-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: true
        }
      });
    }
  };

  // Determine if this is a special program (YC or Venture Lab) or a regular grant/opportunity
  const isSpecialProgram = id === "y-combinator" || id === "venture-lab";
  const programName = id === "venture-lab" ? "Venture Lab" : 
                     id === "y-combinator" ? "Y Combinator" : 
                     opportunity?.title || "Grant";

  // Get checklist items based on opportunity type
  const getChecklistItems = () => {
    const commonItems = (
      <>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="item-2"
            className="mt-1"
            checked={checkedItems["item-2"] || false}
            onCheckedChange={() => handleCheck("item-2")}
          />
          <div>
            <label htmlFor="item-2" className="text-base font-medium cursor-pointer">
              {isSpecialProgram ? "Prepare startup information" : "Prepare project proposal and budget"}
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
      </>
    );

    if (isSpecialProgram) {
      return (
        <>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="item-1"
              className="mt-1"
              checked={checkedItems["item-1"] || false}
              onCheckedChange={() => handleCheck("item-1")}
            />
            <div>
              <label htmlFor="item-1" className="text-base font-medium cursor-pointer">
                Confirm your startup meets eligibility criteria{" "}
                <span 
                  className="text-green-600 cursor-pointer hover:underline"
                  onClick={handleEligibilityClick}
                >
                  here
                </span>.
              </label>
            </div>
          </div>
          {commonItems}
        </>
      );
    } else {
      return (
        <>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="item-1"
              className="mt-1"
              checked={checkedItems["item-1"] || false}
              onCheckedChange={() => handleCheck("item-1")}
            />
            <div>
              <label htmlFor="item-1" className="text-base font-medium cursor-pointer">
                Review grant requirements and guidelines
              </label>
            </div>
          </div>
          {commonItems}
        </>
      );
    }
  };

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
              {getChecklistItems()}
              <div className="bg-white rounded-md border">
                <div onClick={handleInterviewClick} className="cursor-pointer">
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
      </PhoneFrame>
    </div>
  );
};

export default ApplicationChecklistPage;
