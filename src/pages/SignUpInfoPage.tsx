import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { useUserProfile } from "@/lib/UserProfileContext";

const SignUpInfoPage = () => {
    const { profile, updateProfile } = useUserProfile();
    const [industry, setIndustry] = useState(profile.industry);
    const [stage, setStage] = useState(profile.stage);
    const [area, setArea] = useState(profile.location);
    const [teamSize, setTeamSize] = useState(profile.teamSize || "");

    const navigate = useNavigate();

    const handleClick = () => {
        // Update profile with selected values
        updateProfile({
            industry: industry,
            stage: stage,
            location: area,
            teamSize: teamSize
        });
        
        navigate("/home");
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-center text-xl font-bold mb-10 text-[#45625D]">We just need a few more details to tailor the grants for you.</p>

                        <div className="w-full mb-5">
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

                        <div className="w-full mb-5">
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

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <Select value={area} onValueChange={setArea}>
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

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Team Size</label>
                            <Select value={teamSize} onValueChange={setTeamSize}>
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

                        <Button
                            className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 mt-5 border-none"
                            onClick={handleClick}
                        >
                            Find My Recommended Grants
                        </Button>
                    </div>
                </div>
            </PhoneFrame>
        </div>
    );
};

export default SignUpInfoPage;
