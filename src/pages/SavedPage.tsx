
import React, { useState } from "react";
import { Bookmark, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import SavedOpportunityCard from "@/components/SavedOpportunityCard";

const SavedPage = () => {
  const [filters, setFilters] = useState<string[]>(["Pre-seed"]);

  const removeFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const savedOpportunities = [
    {
      id: "venture-lab",
      title: "Venture Lab",
      deadline: "Deadline: 2/15/2025",
      hasDeadline: true,
    },
    {
      id: "google-startups",
      title: "Google for Startups Black",
      deadline: "No deadline",
      hasDeadline: false,
    },
    {
      id: "thiel-fellowship",
      title: "Thiel Fellowship",
      deadline: "Deadline: 1/31/2023",
      hasDeadline: true,
    }
  ];

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-4 overflow-auto">
            <div className="flex items-center mb-6 relative">
              <div className="absolute left-0">
                <Bookmark className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold flex-1 text-center">Saved</h1>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Filter Saved</h2>
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <path 
                    d="M3 5H21M16.2 12H7.8M12.6 19H11.4" 
                    stroke="black" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <Badge 
                    key={filter}
                    variant="outline" 
                    className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                  >
                    {filter}
                    <X 
                      className="h-3 w-3 cursor-pointer ml-1" 
                      onClick={() => removeFilter(filter)} 
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {savedOpportunities.map((opportunity) => (
                <SavedOpportunityCard 
                  key={opportunity.id}
                  id={opportunity.id}
                  title={opportunity.title}
                  deadline={opportunity.deadline}
                  hasDeadline={opportunity.hasDeadline}
                />
              ))}
            </div>
          </div>

          <BottomNavigation activeTab="Saved" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default SavedPage;
