
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
      title: "The Grant Fund",
      amount: "$150k",
      progress: "0%",
      deadline: "3/15/2025"
    },
    {
      id: 2,
      title: "The Patrick Grant",
      amount: "$100k",
      progress: "0%",
      deadline: "6/15/2025"
    },
    {
      id: 3,
      title: "Women Grant",
      amount: "$200k",
      progress: "0%",
      deadline: "2/10/2025"
    },
    {
      id: 4,
      title: "Venture Lab",
      amount: "$10k",
      progress: "0%",
      deadline: "2/27/2025"
    },
    {
      id: 5,
      title: "Y Combinator",
      amount: "$150k",
      progress: "0%",
      deadline: "2/15/2025"
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
                {fundingResults.map(result => (
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
