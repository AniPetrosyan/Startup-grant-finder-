import React, { useState } from "react";
import { Bookmark, X, Calendar, List, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavigation from "@/components/BottomNavigation";
import SavedOpportunityCard from "@/components/SavedOpportunityCard";
import { useSavedOpportunities } from "@/lib/SavedOpportunitiesContext";
import { Checkbox } from "@/components/ui/checkbox";
import Label from "@/components/ui/label";

interface SavedOpportunity {
  id: string;
  title: string;
  amount?: string;
  type?: string;
  stage?: string;
  deadline?: string;
  hasDeadline?: boolean;
}

// Define filter categories
const FILTER_OPTIONS = {
  stage: ["Pre-seed", "Seed", "Series A", "Growth"],
  amount: ["Under $10k", "$10k - $50k", "$50k - $100k", "$100k - $500k", "Over $500k"],
  type: ["Grant", "Investment", "Fellowship", "Accelerator"]
};

const SavedPage = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { savedOpportunities } = useSavedOpportunities();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      removeFilter(filter);
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Helper function to categorize amount into ranges
  const getAmountRange = (amount: string): string => {
    const cleanAmount = amount.replace(/[$\s]/g, '');
    const numericAmount = parseFloat(cleanAmount.replace(/,/g, ''));
    
    if (isNaN(numericAmount)) return 'Any';
    
    if (numericAmount < 10000) return 'Under $10k';
    if (numericAmount < 50000) return '$10k - $50k';
    if (numericAmount < 100000) return '$50k - $100k';
    if (numericAmount < 500000) return '$100k - $500k';
    return 'Over $500k';
  };

  // Helper function to check if an opportunity matches the active filters
  const matchesFilters = (opportunity: SavedOpportunity) => {
    if (activeFilters.length === 0) return true;
    
    const activeAmountFilters = activeFilters.filter(f => FILTER_OPTIONS.amount.includes(f));
    const activeTypeFilters = activeFilters.filter(f => FILTER_OPTIONS.type.includes(f));
    const activeStageFilters = activeFilters.filter(f => FILTER_OPTIONS.stage.includes(f));

    const amountRange = getAmountRange(opportunity.amount || '');

    const matchesAmount = activeAmountFilters.length === 0 || (amountRange && activeAmountFilters.includes(amountRange));
    const matchesType = activeTypeFilters.length === 0 || activeTypeFilters.includes(opportunity.type || '');
    const matchesStage = activeStageFilters.length === 0 || activeStageFilters.includes(opportunity.stage || '');

    return matchesAmount && matchesType && matchesStage;
  };

  const filteredOpportunities = savedOpportunities.filter(matchesFilters);

  // Calendar view helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Group opportunities by date for calendar view
  const opportunitiesByDate = filteredOpportunities.reduce((acc, opp) => {
    if (opp.deadline) {
      const date = new Date(opp.deadline);
      const dateKey = date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(opp);
    }
    return acc;
  }, {} as Record<string, SavedOpportunity[]>);

  const handlePrevMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1));
  };

  const renderCalendarView = () => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedMonth);
    const monthName = selectedMonth.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase();
    const days = [];

    // Reorder days to start with Monday
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    const adjustedFirstDay = (firstDay + 6) % 7;

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      const prevMonthDay = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), -adjustedFirstDay + i + 1);
      days.push(
        <div key={`empty-${i}`} className="h-12 flex items-center justify-center">
          <span className="text-gray-400 text-sm">{prevMonthDay.getDate()}</span>
        </div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), day);
      const dateKey = date.toISOString().split('T')[0];
      const opportunities = opportunitiesByDate[dateKey] || [];
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = dateKey === selectedDate;

      days.push(
        <button 
          key={day} 
          className={`h-12 relative flex flex-col items-center ${opportunities.length > 0 ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => opportunities.length > 0 && setSelectedDate(isSelected ? null : dateKey)}
          disabled={opportunities.length === 0}
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-1 ${
            isSelected ? 'bg-[#45625D] text-white' :
            isToday ? 'bg-blue-500 text-white' : ''
          }`}>
            <span className="text-sm">{day}</span>
          </div>
          {opportunities.length > 0 && (
            <div className="flex gap-0.5 absolute bottom-1">
              {opportunities.slice(0, 2).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#45625D]' : 'bg-blue-500'}`}
                />
              ))}
              {opportunities.length > 2 && (
                <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#45625D]' : 'bg-blue-500'}`} />
              )}
            </div>
          )}
        </button>
      );
    }

    // Add remaining days from next month
    const remainingCells = 42 - (days.length);
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="h-12 flex items-center justify-center">
          <span className="text-gray-400 text-sm">{i}</span>
        </div>
      );
    }

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="text-base font-medium tracking-wide">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5 transform rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-7 text-center mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-xs font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px">
          {days}
        </div>
      </div>
    );
  };

  // Get opportunities for selected date
  const selectedDateOpportunities = selectedDate ? opportunitiesByDate[selectedDate] || [] : [];
  const selectedDateFormatted = selectedDate 
    ? new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }).toUpperCase()
    : null;

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full bg-white relative overflow-hidden">
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
                <div className="flex gap-2">
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-5 w-5" />
                  </button>
                  <button 
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => setViewMode('calendar')}
                  >
                    <Calendar className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsFilterOpen(true)}
                  >
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
                  </button>
                </div>
              </div>
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
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
              )}
            </div>

            {filteredOpportunities.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                {savedOpportunities.length === 0 ? (
                  <>
                    <p className="text-lg">No saved opportunities yet</p>
                    <p className="text-sm mt-2">Save opportunities to view them here</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg">No matches found</p>
                    <p className="text-sm mt-2">Try adjusting your filters</p>
                  </>
                )}
              </div>
            ) : viewMode === 'calendar' ? (
              <>
                {renderCalendarView()}
                
                {selectedDate && selectedDateOpportunities.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-gray-600">
                        {selectedDateFormatted}
                      </h3>
                      <button
                        onClick={() => setSelectedDate(null)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedDateOpportunities.map((opportunity) => (
                        <SavedOpportunityCard 
                          key={opportunity.id}
                          id={opportunity.id}
                          title={opportunity.title}
                          deadline={opportunity.deadline}
                          hasDeadline={opportunity.hasDeadline}
                          amount={opportunity.amount}
                          type={opportunity.type}
                          stage={opportunity.stage}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                {filteredOpportunities.map((opportunity) => (
                  <SavedOpportunityCard 
                    key={opportunity.id}
                    id={opportunity.id}
                    title={opportunity.title}
                    deadline={opportunity.deadline}
                    hasDeadline={opportunity.hasDeadline}
                    amount={opportunity.amount}
                  />
                ))}
              </div>
            )}
          </div>

          {isFilterOpen && (
            <div 
              className="absolute inset-0 bg-black/20"
              onClick={() => setIsFilterOpen(false)}
            />
          )}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl transition-transform duration-300 ease-out shadow-lg ${
              isFilterOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{ height: '70%' }}
          >
            <div className="p-4 h-full">
              <div className="flex flex-col items-center mb-4">
                <div className="w-10 h-1 bg-gray-300 rounded-full mb-4" />
                <h2 className="text-xl font-bold">Filter Saved</h2>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-80px)] pb-16">
                {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
                  <div key={category} className="mb-8 last:mb-16">
                    <h3 className="text-sm font-semibold mb-3 capitalize">{category}</h3>
                    <div className="space-y-2">
                      {options.map((option) => (
                        <div key={option} className="flex items-center">
                          <Checkbox
                            id={option}
                            checked={activeFilters.includes(option)}
                            onCheckedChange={() => toggleFilter(option)}
                          />
                          <label
                            htmlFor={option}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-2"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BottomNavigation activeTab="Saved" />
        </div>
      </PhoneFrame>
    </div>
  );
};

export default SavedPage;
