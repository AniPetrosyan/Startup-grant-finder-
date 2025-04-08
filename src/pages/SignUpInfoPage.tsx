import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

const SignUpInfoPage = () => {
    const [industry, setIndustry] = useState("");
    const [stage, setStage] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    // Still need to implement sign up functionality (pass in selected properties to home page)
    // For now, just navigate to index (home) page on sign up
    const handleClick = () => {
        navigate(`/home`);
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold mb-10 text-[#45625D]">Thanks for signing up!</p>
                        <p className="text-center text-xl font-bold mb-10 text-[#45625D]"> We just need a few more details to tailor the grants for you.</p>

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

                        <Button
                            className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 mt-5 border-none"
                            onClick={handleClick}
                        >
                            Create Account
                        </Button>
                    </div>
                    <div className="overflow-auto pb-10 flex items-center justify-center">
                        <p className="font-medium mb-2 text-[#0D171C]">Already have an account? <Link to="/login" className="text-[#3F7856]">Login</Link></p>
                    </div>
                </div>
            </PhoneFrame>
        </div>
    );
};

export default SignUpInfoPage;
