import React from "react";
import { Bookmark, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SavedOpportunityCardProps {
  id: string;
  title: string;
  deadline: string;
  hasDeadline: boolean;
  amount?: string;
  type?: string;
  stage?: string;
  progress?: {
    application: boolean;
    interview: boolean;
    decision: boolean;
  };
}

const SavedOpportunityCard: React.FC<SavedOpportunityCardProps> = ({
  id,
  title,
  deadline,
  hasDeadline,
  amount,
  type,
  stage,
  progress
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const opportunity = {
      id,
      title,
      deadline,
      amount,
      type,
      stage,
      progress,
      description: id === "y-combinator" 
        ? "Y Combinator is a startup accelerator that invests in a large number of startups twice a year. The program offers startups $500k and 3 months of intensive support while working on their startup idea."
        : id === "venture-lab"
        ? "Venture Lab is an early-stage startup program focused on helping entrepreneurs validate their ideas and build their first MVP. The program provides initial funding and mentorship."
        : "",
      teamSize: id === "y-combinator" ? "2-5" : id === "venture-lab" ? "1-2" : "",
      industry: "Technology"
    };

    navigate(`/opportunity/${id}`, {
      state: {
        opportunity,
        fromSaved: true
      }
    });
  };

  const getProgressText = () => {
    if (!progress) return "";
    if (progress.decision) return "Decision Phase";
    if (progress.interview) return "Interview Phase";
    if (progress.application) return "Application Submitted";
    return "";
  };

  const progressText = getProgressText();

  return (
    <div 
      className="bg-gray-100 rounded-xl p-4 flex items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Bookmark className="h-5 w-5 text-black" />
        <div>
          <h3 className="font-semibold text-black">{title}</h3>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#3F7856]">
              {deadline}
            </p>
            {progressText && (
              <p className="text-xs text-gray-600">
                {progressText}
              </p>
            )}
          </div>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SavedOpportunityCard;
