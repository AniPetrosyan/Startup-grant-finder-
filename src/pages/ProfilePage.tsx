import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload, Loader2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import PhoneFrame from "@/components/PhoneFrame";
import { useUserProfile } from "@/lib/UserProfileContext";

const ProfilePage = () => {
  const { profile, updateProfile } = useUserProfile();
  
  // Add states for edit mode and temporary values
  const [isEditing, setIsEditing] = useState(false);
  const [tempFirstName, setTempFirstName] = useState(profile.firstName);
  const [tempLastName, setTempLastName] = useState(profile.lastName);

  // Add states for avatar upload
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle edit button click
  const handleEditClick = () => {
    if (isEditing) {
      // Save changes
      updateProfile({
        firstName: tempFirstName,
        lastName: tempLastName
      });
      setIsEditing(false);
    } else {
      // Enter edit mode
      setTempFirstName(profile.firstName);
      setTempLastName(profile.lastName);
      setIsEditing(true);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setTempFirstName(profile.firstName);
    setTempLastName(profile.lastName);
  };

  // Handle avatar upload click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a temporary URL for the selected file
      const url = URL.createObjectURL(file);
      updateProfile({ avatarUrl: url });

      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
      <PhoneFrame>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-auto pb-16">
            <div className="p-4">
              <div className="flex justify-center items-center mb-6">
                <h1 className="text-xl font-bold">Profile</h1>
              </div>

              <div className="flex justify-center mb-8">
                <div className="relative group">
                  <Avatar className="w-32 h-32 bg-[#7EC384] relative">
                    {profile.avatarUrl ? (
                      <AvatarImage src={profile.avatarUrl} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-[#7EC384] text-white text-4xl">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button 
                        className="flex flex-col items-center justify-center gap-1 bg-transparent text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                        onClick={handleUploadClick}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span className="text-xs font-medium">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload size={20} />
                            <span className="text-xs font-medium">Upload</span>
                          </>
                        )}
                      </button>
                    </div>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input 
                      value={isEditing ? tempFirstName : profile.firstName} 
                      onChange={(e) => setTempFirstName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="flex-1 pl-2">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input 
                      value={isEditing ? tempLastName : profile.lastName} 
                      onChange={(e) => setTempLastName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="ml-2 pt-6 flex gap-2">
                    {isEditing && (
                      <span 
                        className="text-gray-500 cursor-pointer"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </span>
                    )}
                    <span 
                      className="text-[#7EC384] cursor-pointer"
                      onClick={handleEditClick}
                    >
                      {isEditing ? 'Save' : 'Edit'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Industry</label>
                  <Select 
                    value={profile.industry} 
                    onValueChange={(value) => updateProfile({ industry: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stage</label>
                  <Select 
                    value={profile.stage} 
                    onValueChange={(value) => updateProfile({ stage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pre-seed, Seed">Pre-seed, Seed</SelectItem>
                      <SelectItem value="Series A">Series A</SelectItem>
                      <SelectItem value="Series B">Series B</SelectItem>
                      <SelectItem value="Series C+">Series C+</SelectItem>
                      <SelectItem value="Public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Team Size</label>
                  <Select 
                    value={profile.teamSize} 
                    onValueChange={(value) => updateProfile({ teamSize: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Team Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Solo Founder</SelectItem>
                      <SelectItem value="2-5">2-5 Team Members</SelectItem>
                      <SelectItem value="6-10">6-10 Team Members</SelectItem>
                      <SelectItem value="11-20">11-20 Team Members</SelectItem>
                      <SelectItem value="20+">20+ Team Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Select 
                    value={profile.location} 
                    onValueChange={(value) => updateProfile({ location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="San Francisco Bay Area">San Francisco Bay Area</SelectItem>
                      <SelectItem value="New York">New York</SelectItem>
                      <SelectItem value="Boston">Boston</SelectItem>
                      <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                      <SelectItem value="Chicago">Chicago</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <h2 className="text-lg font-semibold mb-4 text-[#45625D]">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input 
                        value={profile.email} 
                        onChange={(e) => updateProfile({ email: e.target.value })} 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <Input 
                        type="password" 
                        value="••••••••••" 
                        onChange={() => {}} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-0 left-0 right-0">
            <BottomNavigation activeTab="Profile" />
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
};

export default ProfilePage;
