
import React from "react";
import { cn } from "@/lib/utils";

interface StartupCardProps {
  name: string;
  fundingAmount: string;
  progress: string;
  applicationDate: string;
  isSelected?: boolean;
  onClick: () => void;
}

const StartupCard: React.FC<StartupCardProps> = ({
  name,
  fundingAmount,
  progress,
  applicationDate,
  isSelected = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "border rounded-xl p-4 mb-4 cursor-pointer transition-colors bg-[#F7FAFA]",
        isSelected ? "bg-[#E4F2E2] border-green-200" : "border-gray-300"
      )}
      onClick={onClick}
    >
      <h3 className="font-bold text-xl mb-2 text-gray-900">{name}</h3>
      <p className="text-[#3F7856] mb-1">
        Funding Amount: {fundingAmount}, Progress: {progress}
      </p>
      <p className="text-gray-700">Apply by: {applicationDate}</p>
    </div>
  );
};

export default StartupCard;
