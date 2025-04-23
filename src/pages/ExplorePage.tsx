import React, { useState, useEffect } from "react";
import { Search, X, Check, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import FundingCard from "@/components/FundingCard";
import { useLocation } from "react-router-dom";

type FundingOpportunity = {
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
};

const ExplorePage = () => {
  const navigate = useNavigate();
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);
  const [selectedSorts, setSelectedSorts] = useState<string[]>([]);
  const [displaySearchTags, setDisplaySearchTags] = useState<string[]>([]);
  const [industry, setIndustry] = useState<string | null>(null);
  const [stage, setStage] = useState<string | null>(null);
  const [area, setArea] = useState<string | null>(null);
  const [userEligibility, setUserEligibility] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    // Set the industry, stage, and area from the location state
    setIndustry(location.state?.industry || null);
    setStage(location.state?.stage || null);
    setArea(location.state?.location || null);
    setShowSearchResults(location.state?.fromHome || false);
  }, [location]);

  const tabs = ["All", "Grants", "Competitions", "Investors"];

  const suggestions = [
    "Seed",
    "Series A",
    "Series B",
    "Series C",
    "Pre-seed",
    "Post-seed",
    "Idea stage",
    "Prototype stage",
    "MVP stage",
    "Growth stage"
  ];

  const sortOptions = ["Name", "Amount", "Deadline", "Stage Eligibility"];

  useEffect(() => {
    setDisplaySearchTags(selectedSuggestions);

    if (industry) {
      setUserEligibility([...userEligibility, industry])
    }
    if (stage) {
      setUserEligibility([...userEligibility, stage])
    }
    if (area) {
      setUserEligibility([...userEligibility, area])
    }
  }, [selectedSuggestions]);

  const fundingResults: FundingOpportunity[] = [
    {
      id: 1,
      title: "NSF SBIR Phase I Grant",
      amount: "$275,000",
      progress: "Open",
      deadline: "3/15/2025",
      type: "Grant",
      stage: "Pre-seed",
      industry: "Technology",
      teamSize: "2-5",
      description: "Research and development funding for innovative technologies"
    },
    {
      id: 2,
      title: "Y Combinator W24",
      amount: "$500,000",
      progress: "Open",
      deadline: "6/15/2025",
      type: "Accelerator",
      stage: "Seed",
      industry: "Open",
      teamSize: "2-5",
      description: "Leading startup accelerator program with investment"
    },
    {
      id: 3,
      title: "Women Founders Fund",
      amount: "$75,000",
      progress: "Open",
      deadline: "2/10/2025",
      type: "Grant",
      stage: "Pre-seed",
      industry: "Open",
      teamSize: "solo",
      description: "Supporting women entrepreneurs in early stages"
    },
    {
      id: 4,
      title: "Healthcare Innovation Grant",
      amount: "$150,000",
      progress: "Open",
      deadline: "4/20/2025",
      type: "Grant",
      stage: "Series A",
      industry: "Healthcare",
      teamSize: "6-10",
      description: "Advancing healthcare technology solutions"
    },
    {
      id: 5,
      title: "Climate Tech Fellowship",
      amount: "$90,000",
      progress: "Open",
      deadline: "5/1/2025",
      type: "Fellowship",
      stage: "Pre-seed",
      industry: "Technology",
      teamSize: "solo",
      description: "Supporting innovators in climate technology"
    },
    {
      id: 6,
      title: "EdTech Accelerator Program",
      amount: "$120,000",
      progress: "Open",
      deadline: "3/30/2025",
      type: "Accelerator",
      stage: "Seed",
      industry: "Education",
      teamSize: "2-5",
      description: "Accelerator focused on education technology startups"
    },
    {
      id: 7,
      title: "Fintech Innovation Award",
      amount: "$200,000",
      progress: "Open",
      deadline: "4/15/2025",
      type: "Grant",
      stage: "Series A",
      industry: "Finance",
      teamSize: "6-10",
      description: "Supporting innovative financial technology solutions"
    },
    {
      id: 8,
      title: "Social Impact Fund",
      amount: "$50,000",
      progress: "Open",
      deadline: "5/15/2025",
      type: "Investment",
      stage: "Seed",
      industry: "Open",
      teamSize: "2-5",
      description: "Investment for startups with social impact focus"
    },
    {
      id: 9,
      title: "Deep Tech Grant",
      amount: "$300,000",
      progress: "Open",
      deadline: "6/1/2025",
      type: "Grant",
      stage: "Series A",
      industry: "Technology",
      teamSize: "11-20",
      description: "Supporting deep technology research and development"
    },
    {
      id: 10,
      title: "First-Time Founders Program",
      amount: "$25,000",
      progress: "Open",
      deadline: "3/1/2025",
      type: "Grant",
      stage: "Pre-seed",
      industry: "Open",
      teamSize: "solo",
      description: "Supporting first-time entrepreneurs"
    },
    {
      id: 11,
      title: "TechCrunch Disrupt Startup Battlefield",
      amount: "$100,000",
      progress: "Open",
      deadline: "5/30/2025",
      type: "Competition",
      stage: "Seed",
      industry: "Technology",
      teamSize: "2-5",
      description: "Premier startup competition with live pitch to top VCs"
    },
    {
      id: 12,
      title: "Startup World Cup",
      amount: "$1,000,000",
      progress: "Open",
      deadline: "4/15/2025",
      type: "Competition",
      stage: "Series A",
      industry: "Open",
      teamSize: "6-10",
      description: "Global startup competition with regional preliminaries"
    },
    {
      id: 13,
      title: "CleanTech Innovation Challenge",
      amount: "$250,000",
      progress: "Open",
      deadline: "7/1/2025",
      type: "Competition",
      stage: "Pre-seed",
      industry: "Technology",
      teamSize: "2-5",
      description: "Competition for innovative clean technology solutions"
    },
    {
      id: 14,
      title: "HealthTech Innovator Challenge",
      amount: "$150,000",
      progress: "Open",
      deadline: "6/30/2025",
      type: "Competition",
      stage: "Seed",
      industry: "Healthcare",
      teamSize: "2-5",
      description: "Competition for breakthrough healthcare technologies"
    },
    {
      id: 15,
      title: "Sequoia Capital Seed Fund",
      amount: "$2,000,000",
      progress: "Open",
      deadline: "Rolling",
      type: "Investor",
      stage: "Seed",
      industry: "Open",
      teamSize: "2-5",
      description: "Seed funding from leading VC firm with strong portfolio support"
    },
    {
      id: 16,
      title: "Andreessen Horowitz Series A",
      amount: "$5,000,000",
      progress: "Open",
      deadline: "Rolling",
      type: "Investor",
      stage: "Series A",
      industry: "Technology",
      teamSize: "6-10",
      description: "Series A funding from top-tier VC with extensive network"
    },
    {
      id: 17,
      title: "Khosla Ventures Healthcare Fund",
      amount: "$3,000,000",
      progress: "Open",
      deadline: "Rolling",
      type: "Investor",
      stage: "Seed",
      industry: "Healthcare",
      teamSize: "2-5",
      description: "Healthcare-focused investment from experienced VC firm"
    },
    {
      id: 18,
      title: "500 Global Accelerator",
      amount: "$150,000",
      progress: "Open",
      deadline: "3/30/2025",
      type: "Investor",
      stage: "Pre-seed",
      industry: "Open",
      teamSize: "2-5",
      description: "Global early-stage VC program with extensive mentor network"
    },
    {
      id: 19,
      title: "MIT $100K Competition",
      amount: "$100,000",
      progress: "Open",
      deadline: "4/1/2025",
      type: "Competition",
      stage: "Pre-seed",
      industry: "Open",
      teamSize: "2-5",
      description: "Prestigious university startup competition with mentorship"
    },
    {
      id: 20,
      title: "Accel Partners Growth Fund",
      amount: "$10,000,000",
      progress: "Open",
      deadline: "Rolling",
      type: "Investor",
      stage: "Series B",
      industry: "Technology",
      teamSize: "11-20",
      description: "Growth-stage funding for scaling technology companies"
    }
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSuggestionToggle = (suggestion: string) => {
    if (selectedSuggestions.includes(suggestion)) {
      setSelectedSuggestions(selectedSuggestions.filter(item => item !== suggestion));
    } else {
      setSelectedSuggestions([...selectedSuggestions, suggestion]);
    }
  };

  const handleSearch = () => {
    setShowSearchResults(true);
  };

  const handleBackToExplore = () => {
    setShowSearchResults(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  const handleSortToggle = (option: string) => {
    if (selectedSorts.includes(option)) {
      setSelectedSorts(selectedSorts.filter(item => item !== option));
    } else {
      setSelectedSorts([...selectedSorts, option]);
    }
  };

  const removeKeyword = (keyword: string) => {
    setSelectedSuggestions(selectedSuggestions.filter(item => item !== keyword));
  };

  const removeSort = (sort: string) => {
    setSelectedSorts(selectedSorts.filter(item => item !== sort));
  };

  const removeTagFromSearch = (tag: string) => {
    setDisplaySearchTags(displaySearchTags.filter(item => item !== tag));
    setSelectedSuggestions(selectedSuggestions.filter(item => item !== tag));
    if (tag === industry) {
      setIndustry(null);
    }
    if (tag === stage) {
      setStage(null);
    }
    if (tag === area) {
      setArea(null);
    }
  };

  const filterResults = () => {
    return fundingResults.filter(opportunity => {
      // Filter by search term
      if (searchValue && !opportunity.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }

      // Filter by tab
      if (activeTab !== "All" && !opportunity.type.includes(activeTab.slice(0, -1))) {
        return false;
      }

      // Filter by stage suggestions
      if (selectedSuggestions.length > 0 && !selectedSuggestions.includes(opportunity.stage)) {
        return false;
      }

      // Filter by industry
      if (industry && opportunity.industry !== industry && opportunity.industry !== "Open") {
        return false;
      }

      // Filter by stage
      if (stage && opportunity.stage !== stage) {
        return false;
      }

      return true;
    });
  };

  if (showSearchResults) {
    return (
      <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
        <PhoneFrame>
          <div className="flex flex-col h-full bg-white">
            <div className="flex-1 p-4 overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <button onClick={handleBackToExplore} className="p-1">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Results</h1>
                <div className="w-5"></div>
              </div>

              <div className="mb-4">
                <h2 className="text-sm font-medium mb-2">Keywords</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {industry ?
                    <Badge
                      key={industry}
                      variant="outline"
                      className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                    >
                      {industry}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeTagFromSearch(industry)}
                      />
                    </Badge> : null}

                  {stage ?
                    <Badge
                      key={stage}
                      variant="outline"
                      className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                    >
                      {stage}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeTagFromSearch(stage)}
                      />
                    </Badge> : null}

                  {area ?
                    <Badge
                      key={area}
                      variant="outline"
                      className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                    >
                      {area}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeTagFromSearch(area)}
                      />
                    </Badge> : null}

                  {selectedSuggestions.map(keyword => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                    >
                      {keyword}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeKeyword(keyword)}
                      />
                    </Badge>
                  ))}

                  {selectedSorts.map(sort => (
                    <Badge
                      key={sort}
                      variant="outline"
                      className="bg-gray-200 text-gray-800 hover:bg-gray-200 px-3 py-1.5 rounded-full flex items-center gap-1 text-sm"
                    >
                      Sort: {sort}
                      <X
                        className="h-3 w-3 cursor-pointer ml-1"
                        onClick={() => removeSort(sort)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filterResults().map(result => (
                  <FundingCard key={result.id} opportunity={result} />
                ))}
              </div>
            </div>

            <BottomNavigation activeTab="Explore" />
          </div>
        </PhoneFrame>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white">
          <div className="flex-1 p-4 overflow-auto">
            <h1 className="text-xl font-bold mb-4 text-center">Explore</h1>

            <div className="bg-gray-100 rounded-xl flex items-center px-3 py-2 mb-4">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              {displaySearchTags.length > 0 ? (
                <div className="flex-1 flex flex-wrap gap-1">
                  {displaySearchTags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1 mr-1 mb-1">
                      <span className="text-sm">{tag}</span>
                      <X
                        className="h-3 w-3 text-gray-500 cursor-pointer ml-1"
                        onClick={() => removeTagFromSearch(tag)}
                      />
                    </div>
                  ))}
                  {searchValue && (
                    <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 mr-1 mb-1">
                      <span className="text-sm">{searchValue}</span>
                      <X
                        className="h-3 w-3 text-gray-500 cursor-pointer ml-1"
                        onClick={clearSearch}
                      />
                    </div>
                  )}
                  <Input
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 flex-1 placeholder:text-gray-400 text-sm min-w-[80px]"
                    placeholder={displaySearchTags.length > 0 ? "" : "Search for grants, competitions..."}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                  />
                </div>
              ) : (
                <Input
                  className="border-none bg-transparent shadow-none focus-visible:ring-0 flex-1 placeholder:text-gray-400 text-sm"
                  placeholder="Search for grants, competitions..."
                  value={searchValue}
                  onChange={handleSearchInputChange}
                />
              )}
            </div>

            <div className="flex gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full text-sm ${activeTab === tab
                    ? "bg-white border border-green-600 text-green-700 font-medium"
                    : "bg-gray-100 text-gray-800"
                    }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Suggestions</h2>
              <div className="flex flex-wrap gap-2">
                {suggestions.map(suggestion => (
                  <button
                    key={suggestion}
                    className={`px-4 py-2 rounded-full text-sm ${selectedSuggestions.includes(suggestion)
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-100 text-gray-800"
                      }`}
                    onClick={() => handleSuggestionToggle(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3">Sort by</h2>
              <div className="space-y-3">
                {sortOptions.map(option => (
                  <div key={option} className="flex items-center justify-between">
                    <span className="text-base">{option}</span>
                    <div
                      className={`w-5 h-5 rounded border ${selectedSorts.includes(option) ? 'flex items-center justify-center bg-[#7EC384] border-[#7EC384]' : 'border-gray-300'
                        }`}
                      onClick={() => handleSortToggle(option)}
                    >
                      {selectedSorts.includes(option) && <Check className="h-4 w-4 text-white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 border-none"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          <BottomNavigation activeTab="Explore" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default ExplorePage;
