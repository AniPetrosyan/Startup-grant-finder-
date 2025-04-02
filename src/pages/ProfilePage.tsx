
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Upload } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import PhoneFrame from "@/components/PhoneFrame";

const ProfilePage = () => {
  const [firstName, setFirstName] = useState("Emily");
  const [lastName, setLastName] = useState("Smith");
  const [industry, setIndustry] = useState("Open");
  const [stage, setStage] = useState("Pre-seed, Seed");
  const [location, setLocation] = useState("San Francisco Bay Area");
  const [email, setEmail] = useState("pennkey@sas.upenn.edu");
  const [password, setPassword] = useState("••••••••••");

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
                <div className="relative">
                  <Avatar className="w-32 h-32 bg-[#7EC384]">
                    <AvatarFallback className="bg-[#7EC384] text-white text-4xl">
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex items-center justify-center gap-1 bg-transparent text-white border border-dashed border-white p-2 rounded-md">
                      <Upload size={12} />
                      <span className="text-xs">Upload</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <Input 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)} 
                    />
                  </div>
                  <div className="flex-1 pl-2">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <Input 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                  </div>
                  <div className="ml-2 pt-6">
                    <span className="text-[#7EC384] cursor-pointer">Edit</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Industry</label>
                  <Select value={industry} onValueChange={setIndustry}>
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
                  <Select value={stage} onValueChange={setStage}>
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
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Select value={location} onValueChange={setLocation}>
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
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Password</label>
                      <Input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
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
