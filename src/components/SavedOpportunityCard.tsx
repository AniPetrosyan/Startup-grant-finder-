
import React from "react";
import { Bookmark, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SavedOpportunityCardProps {
  id: string;
  title: string;
  deadline: string;
  hasDeadline: boolean;
}

const SavedOpportunityCard: React.FC<SavedOpportunityCardProps> = ({
  id,
  title,
  deadline,
  hasDeadline,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/opportunity/${id}`);
  };

  return (
    <div 
      className="bg-gray-100 rounded-xl p-4 flex items-center justify-between cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <Bookmark className="h-5 w-5 text-black" />
        <div>
          <h3 className="font-semibold text-black">{title}</h3>
          <p className="text-sm text-[#3F7856]">
            {deadline}
          </p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};

export default SavedOpportunityCard;
