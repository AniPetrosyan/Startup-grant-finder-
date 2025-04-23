import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedOpportunity {
  id: string;
  title: string;
  deadline?: string;
  hasDeadline?: boolean;
  amount?: string;
  type?: string;
  stage?: string;
  progress?: {
    application: boolean;
    interview: boolean;
    decision: boolean;
  };
}

interface SavedOpportunitiesContextType {
  savedOpportunities: SavedOpportunity[];
  saveOpportunity: (opportunity: SavedOpportunity) => void;
  removeOpportunity: (id: string) => void;
  isOpportunitySaved: (id: string) => boolean;
  updateProgress: (id: string, progress: { application?: boolean; interview?: boolean; decision?: boolean }) => void;
}

const SavedOpportunitiesContext = createContext<SavedOpportunitiesContextType | undefined>(undefined);

// Current opportunity data
const CURRENT_DEADLINES = {
  "y-combinator": "4/23/2025",
  "venture-lab": "4/28/2025"
};

export function SavedOpportunitiesProvider({ children }: { children: React.ReactNode }) {
  const [savedOpportunities, setSavedOpportunities] = useState<SavedOpportunity[]>(() => {
    const saved = localStorage.getItem('savedOpportunities');
    const parsedOpportunities = saved ? JSON.parse(saved) : [];
    
    // Update any existing opportunities with current deadlines
    return parsedOpportunities.map((opp: SavedOpportunity) => {
      const updatedOpp = {
        ...opp,
        progress: opp.progress || { application: false, interview: false, decision: false }
      };
      
      if (CURRENT_DEADLINES[opp.id as keyof typeof CURRENT_DEADLINES]) {
        updatedOpp.deadline = CURRENT_DEADLINES[opp.id as keyof typeof CURRENT_DEADLINES];
      }
      
      return updatedOpp;
    });
  });

  useEffect(() => {
    localStorage.setItem('savedOpportunities', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  const saveOpportunity = (opportunity: SavedOpportunity) => {
    // Ensure we're using the current deadline if it's a known opportunity
    const updatedOpportunity = {
      ...opportunity,
      deadline: CURRENT_DEADLINES[opportunity.id as keyof typeof CURRENT_DEADLINES] || opportunity.deadline,
      progress: { application: false, interview: false, decision: false }
    };
    setSavedOpportunities(prev => [...prev, updatedOpportunity]);
  };

  const removeOpportunity = (id: string) => {
    setSavedOpportunities(prev => prev.filter(opp => opp.id !== id));
  };

  const isOpportunitySaved = (id: string) => {
    return savedOpportunities.some(opp => opp.id === id);
  };

  const updateProgress = (id: string, progress: { application?: boolean; interview?: boolean; decision?: boolean }) => {
    setSavedOpportunities(prev => prev.map(opp => {
      if (opp.id === id) {
        return {
          ...opp,
          progress: {
            ...opp.progress,
            ...progress
          }
        };
      }
      return opp;
    }));
  };

  return (
    <SavedOpportunitiesContext.Provider 
      value={{ 
        savedOpportunities, 
        saveOpportunity, 
        removeOpportunity,
        isOpportunitySaved,
        updateProgress
      }}
    >
      {children}
    </SavedOpportunitiesContext.Provider>
  );
}

export function useSavedOpportunities() {
  const context = useContext(SavedOpportunitiesContext);
  if (context === undefined) {
    throw new Error('useSavedOpportunities must be used within a SavedOpportunitiesProvider');
  }
  return context;
}

const getOpportunityAmount = (funding: string) => {
  const numbers = funding.match(/\d+(?:,\d+)*/g);
  if (!numbers) return undefined;
  const numericValue = parseInt(numbers[0].replace(/,/g, ''));
  return numericValue.toString();
};

const getAmountRange = (amount: string) => {
  const numericValue = parseInt(amount);
  if (numericValue < 10000) return "< $10k";
  if (numericValue < 100000) return "$10k - $100k";
  if (numericValue < 1000000) return "$100k - $1M";
  return "> $1M";
}; 