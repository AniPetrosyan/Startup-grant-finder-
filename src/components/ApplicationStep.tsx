
import React from "react";

interface ApplicationStepProps {
  number: number;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ApplicationStep: React.FC<ApplicationStepProps> = ({ 
  number, 
  title,
  isActive = false,
  onClick
}) => {
  return (
    <div 
      className={`flex items-center justify-between py-4 px-4 border-b ${isActive ? "bg-[#E4F2E2]" : ""}`}
      onClick={onClick}
    >
      <p className={`${isActive ? "text-gray-900 font-medium" : "text-gray-500"}`}>
        Step {number}: {title}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-gray-500"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
};

export default ApplicationStep;
