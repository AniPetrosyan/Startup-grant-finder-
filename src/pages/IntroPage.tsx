import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import Typewriter from "@/components/Typewriter";

const SignUpInfoPage = () => {
    const [industry, setIndustry] = useState("");
    const [stage, setStage] = useState("");
    const [location, setLocation] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/signup-info`);
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold mb-10 text-[#45625D]">Thanks for signing up!</p>
                        <p className="text-center text-xl mb-10 text-[#45625D]">
                            <Typewriter text="Discovering startup grants just got easier. Pomegrant simplifies the search by recommending grants tailored to your startup.
                            Effortlessly explore opportunities, save your favorites, and track your progress all in one place! Let’s make funding simple." delay={60} />
                        </p>

                        <Button
                            className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 mt-5 border-none"
                            onClick={handleClick}
                        >
                            Finish Tailoring Your Account
                        </Button>
                    </div>
                </div>
            </PhoneFrame>
        </div>
    );
};

export default SignUpInfoPage;
