import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import ApplicationStep from "@/components/ApplicationStep";
import { useState } from "react";
import { useEffect } from "react";
import { useSavedOpportunities } from "@/lib/SavedOpportunitiesContext";
import { Label } from "@/components/ui/label";

interface FundingOpportunity {
  id: number | string;
  title: string;
  amount: string;
  deadline: string;
  type: string;
  stage: string;
  industry: string;
  teamSize: string;
  description: string;
  progress?: {
    application: boolean;
    interview: boolean;
    decision: boolean;
  };
}

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewActive, setInterviewActive] = useState(false);
  const [decisionActive, setDecisionActive] = useState(false);
  const [industry, setIndustry] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  
  const { saveOpportunity, removeOpportunity, isOpportunitySaved, updateProgress } = useSavedOpportunities();
  const isSaved = id ? isOpportunitySaved(id) : false;

  // Get the opportunity details from location state
  const opportunity: FundingOpportunity = location.state?.opportunity;

  // If no opportunity data is available, show a loading state or redirect
  if (!opportunity) {
    navigate("/home", { replace: true });
    return null;
  }

  // Update useEffect to handle progress updates
  useEffect(() => {
    // Activate steps based on navigation history
    if (location.state?.fromApplication) {
      setInterviewActive(true);
    }

    if (location.state?.fromInterviewTips) {
      setInterviewActive(true);
    }

    // Activate decision step if user has visited the decision tips page
    if (location.state?.fromDecisionTips) {
      setInterviewActive(true);
      setDecisionActive(true);
    }

    // Update progress if saved
    if (location.state?.fromApplication && id && isSaved) {
      updateProgress(id, { application: true });
    }

    if (location.state?.fromInterviewTips && id && isSaved) {
      updateProgress(id, { interview: true });
    }

    if (location.state?.fromDecisionTips && id && isSaved) {
      updateProgress(id, { decision: true });
    }

    // Set industry and stage from location state
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
  }, [location, id, isSaved, updateProgress]);

  const handleBack = () => {
    // Special handling for Y Combinator and Venture Lab
    const isSpecialProgram = id === "y-combinator" || id === "venture-lab";
    
    if (isSpecialProgram) {
      // For Y Combinator and Venture Lab, navigate to home
      navigate("/home");
    } else if (location.state?.fromExplore) {
      navigate("/explore", {
        state: {
          industry: industry,
          stage: stage,
          location: area
        }
      });
    } else {
      // For regular opportunities
      navigate(`/opportunity/${id}`, {
        state: {
          opportunity: opportunity,
          industry: industry,
          stage: stage,
          location: area,
          fromApplication: location.state?.fromApplication,
          fromInterviewTips: location.state?.fromInterviewTips,
          fromDecisionTips: location.state?.fromDecisionTips
        }
      });
    }
  };

  const handleApply = () => {
    navigate(`/apply/${id}`, {
      state: {
        industry: industry,
        stage: stage,
        location: area,
        opportunity: opportunity,
        fromApplication: true,
        allStepsCompleted: location.state?.allStepsCompleted
      }
    });
  };

  const handleSaveToggle = () => {
    if (!id || !opportunity) return;
    
    if (isSaved) {
      removeOpportunity(id);
    } else {
      const opportunityToSave = {
        id: id,
        title: opportunity.title,
        deadline: opportunity.deadline,
        hasDeadline: opportunity.deadline !== "Rolling",
        amount: opportunity.amount,
        type: opportunity.type,
        stage: opportunity.stage,
        progress: {
          application: false,
          interview: false,
          decision: false
        }
      };
      saveOpportunity(opportunityToSave);
    }
  };

  const handleDecisionClick = () => {
    if (!interviewActive) return; // Only allow clicking if interview step is active
    
    if (id === "y-combinator") {
      navigate(`/yc-decision-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: true,
          allStepsCompleted: true
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
          fromDecisionTips: true,
          allStepsCompleted: true
        }
      });
    } else {
      navigate(`/decision-tips/${id}`, {
        state: {
          industry: industry,
          stage: stage,
          location: area,
          opportunity: opportunity,
          fromApplication: true,
          fromInterviewTips: true,
          fromDecisionTips: true,
          allStepsCompleted: true
        }
      });
    }
  };

  const getOpportunityAmount = (fundingString: string | undefined) => {
    if (!fundingString) return undefined;
    
    // Extract numbers that might include commas and decimals
    const matches = fundingString.match(/[\d,]+(\.\d+)?/);
    if (!matches) return undefined;
    
    // Clean the extracted number by removing commas
    const cleanAmount = matches[0].replace(/,/g, '');
    const numericValue = parseFloat(cleanAmount);
    
    if (isNaN(numericValue)) return undefined;
    
    // Return the formatted amount with $ symbol
    return `$${cleanAmount}`;
  };

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleBack} className="p-1">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSaveToggle}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-6 w-6 text-[#45625D]" />
                ) : (
                  <Bookmark className="h-6 w-6" />
                )}
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-[#45625D]">{opportunity.title}</h1>

            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <h2 className="text-xl font-semibold mb-2">Funding Details</h2>
                <p className="text-lg font-medium">{getOpportunityAmount(opportunity.amount)}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-700">
                  {opportunity.description}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{opportunity.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stage</span>
                    <span className="font-medium">{opportunity.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry</span>
                    <span className="font-medium">{opportunity.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size</span>
                    <span className="font-medium">{opportunity.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline</span>
                    <span className="font-medium">{opportunity.deadline}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Application Process</h2>
                <div className="bg-white rounded-md border">
                  <div onClick={handleApply} className="cursor-pointer">
                    <ApplicationStep
                      number={1}
                      title="Apply online"
                      isActive={true}
                    />
                  </div>
                  <div 
                    onClick={() => {
                      if (!interviewActive && !location.state?.fromApplication) return;
                      if (id === "y-combinator") {
                        navigate(`/yc-interview-tips/${id}`, {
                          state: {
                            industry: industry,
                            stage: stage,
                            location: area,
                            opportunity: opportunity,
                            fromApplication: true,
                            fromInterviewTips: true,
                            fromDecisionTips: location.state?.fromDecisionTips
                          }
                        });
                      } else if (id === "venture-lab") {
                        navigate(`/venture-lab-interview-tips/${id}`, {
                          state: {
                            industry: industry,
                            stage: stage,
                            location: area,
                            opportunity: opportunity,
                            fromApplication: true,
                            fromInterviewTips: true,
                            fromDecisionTips: location.state?.fromDecisionTips
                          }
                        });
                      } else {
                        navigate(`/interview-tips/${id}`, {
                          state: {
                            industry: industry,
                            stage: stage,
                            location: area,
                            opportunity: opportunity,
                            fromApplication: true,
                            fromInterviewTips: true,
                            fromDecisionTips: location.state?.fromDecisionTips
                          }
                        });
                      }
                    }}
                    className={`cursor-pointer ${!interviewActive && !location.state?.fromApplication ? 'opacity-50' : ''}`}
                  >
                    <ApplicationStep
                      number={2}
                      title="Interview"
                      isActive={interviewActive || location.state?.fromApplication}
                    />
                  </div>
                  <div 
                    onClick={handleDecisionClick}
                    className={`cursor-pointer ${!interviewActive && !location.state?.fromApplication ? 'opacity-50' : ''}`}
                  >
                    <ApplicationStep
                      number={3}
                      title="Decision Tips"
                      isActive={interviewActive || location.state?.fromApplication}
                    />
                  </div>
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

export default OpportunityDetailPage;
