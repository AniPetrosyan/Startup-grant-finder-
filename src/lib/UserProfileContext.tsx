import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  industry: string;
  stage: string;
  location: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  teamSize: string;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  industry: 'Open',
  stage: 'Pre-seed, Seed',
  location: 'San Francisco Bay Area',
  firstName: 'Emily',
  lastName: 'Smith',
  email: 'pennkey@sas.upenn.edu',
  avatarUrl: null,
  teamSize: '1-10',
};

// Helper function to get stored value with default fallback
const getStoredProfile = (): UserProfile => {
  const stored = localStorage.getItem('userProfile');
  if (stored) {
    return JSON.parse(stored);
  }
  return defaultProfile;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => getStoredProfile());

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(current => ({
      ...current,
      ...updates
    }));
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
} 