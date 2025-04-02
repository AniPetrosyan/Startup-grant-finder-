import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="w-[390px] h-[844px] bg-white overflow-y-auto rounded-lg shadow-lg">
      <div className="flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
