
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";

const OpportunityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate("/saved");
  };

  const handleApply = () => {
    navigate(`/apply/${id}`);
  };

  // Define content for each opportunity
  const opportunityDetails = {
    "venture-lab": {
      name: "Venture Lab",
      funding: "$5,000 grant",
      about: "Venture Lab provides early-stage funding and mentorship for student entrepreneurs at the university. The program includes workshops, networking events, and access to resources to help you develop your startup idea.",
      eligibility: [
        "Current university student or recent graduate",
        "Innovative business idea or early prototype",
        "Commitment to participate in program activities"
      ]
    },
    "google-startups": {
      name: "Google for Startups Black",
      funding: "$100,000 in funding",
      about: "Google for Startups Black Founders Fund provides non-dilutive funding to Black-led startups that have participated in Google's programs or have been nominated by Google's partner community. The program includes Google Cloud credits, Google.org ads grants, and hands-on support from Google employees.",
      eligibility: [
        "Black-led startup based in the US",
        "Raised less than $3M in funding",
        "Demonstrates traction and impact in their community"
      ]
    },
    "thiel-fellowship": {
      name: "Thiel Fellowship",
      funding: "$100,000 over two years",
      about: "The Thiel Fellowship is a two-year program for young people who want to build new things. Fellows receive $100,000 and mentorship from the Thiel Foundation's network of founders, investors, and scientists.",
      eligibility: [
        "22 years old or younger",
        "Willing to postpone or leave college to pursue your idea",
        "Innovative startup concept with growth potential"
      ]
    },
    "y-combinator": {
      name: "Y Combinator",
      funding: "$150,000 investment",
      about: "Y Combinator is a startup accelerator that invests in a wide range of startups. The program includes mentorship, funding, and connections to help you scale your startup and prepare for future funding rounds.",
      eligibility: [
        "Startup at any stage of development",
        "Strong founding team",
        "Innovative product or service with growth potential"
      ]
    }
  };

  // Get current opportunity details or use default values
  const currentOpportunity = opportunityDetails[id as keyof typeof opportunityDetails] || {
    name: "Unknown Opportunity",
    funding: "Funding details not available",
    about: "No information available for this opportunity.",
    eligibility: ["No eligibility criteria specified"]
  };

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-6 overflow-y-auto">
            <button onClick={handleBack} className="p-1 mb-4">
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <h1 className="text-3xl font-bold mb-8 text-[#45625D]">{currentOpportunity.name}</h1>
            
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <h2 className="text-xl font-semibold mb-2">Funding Details</h2>
                <p className="text-lg font-medium">{currentOpportunity.funding}</p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-700">
                  {currentOpportunity.about}
                </p>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {currentOpportunity.eligibility.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
              
              <Button 
                onClick={handleApply}
                className="w-full bg-[#3F7856] hover:bg-[#2F5B42] text-white"
              >
                Apply Now
              </Button>
            </div>
          </div>
          
          <BottomNavigation activeTab="Home" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default OpportunityDetailPage;
