import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface FundingOpportunity {
  id: number;
  title: string;
  amount: string;
  progress: string;
  deadline: string;
  type: string;
  stage: string;
  industry: string;
  teamSize: string;
  description: string;
}

interface FundingCardProps {
  opportunity: FundingOpportunity;
}

const FundingCard: React.FC<FundingCardProps> = ({ opportunity }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    const slug = opportunity.title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/opportunity/${slug}`, {
      state: { 
        opportunity: {
          ...opportunity,
          id: slug
        }
      }
    });
  };
  
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow bg-white"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-base">{opportunity.title}</h3>
        <span className="text-green-700 font-semibold">{opportunity.amount}</span>
      </div>
      <p className="text-gray-700 text-sm mb-2">{opportunity.description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <Badge variant="outline" className="bg-blue-50">{opportunity.type}</Badge>
        <Badge variant="outline" className="bg-green-50">{opportunity.stage}</Badge>
        <Badge variant="outline" className="bg-purple-50">{opportunity.industry}</Badge>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-600 text-sm">
          Team size: {opportunity.teamSize}
        </p>
        <p className="text-gray-600 text-sm">
          Apply by: {opportunity.deadline}
        </p>
      </div>
    </div>
  );
};

export default FundingCard;
