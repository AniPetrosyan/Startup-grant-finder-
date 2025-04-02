
import React from "react";
import { useNavigate } from "react-router-dom";

interface FundingOpportunity {
  id: number;
  title: string;
  amount: string;
  progress: string;
  deadline: string;
}

interface FundingCardProps {
  opportunity: FundingOpportunity;
}

const FundingCard: React.FC<FundingCardProps> = ({ opportunity }) => {
  const navigate = useNavigate();
  
  // Convert the title to a URL-friendly slug
  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-');
  };
  
  const handleClick = () => {
    const slug = getSlug(opportunity.title);
    navigate(`/opportunity/${slug}`);
  };
  
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <h3 className="font-bold text-base mb-1">{opportunity.title}</h3>
      <p className="text-green-700 text-sm mb-1">
        Funding Amount: {opportunity.amount}, Progress: {opportunity.progress}
      </p>
      <p className="text-gray-600 text-sm">
        Apply by: {opportunity.deadline}
      </p>
    </div>
  );
};

export default FundingCard;
