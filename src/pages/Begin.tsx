import PhoneFrame from "@/components/PhoneFrame";
import PomegrantLogo from "@/components/assets/pomegrant-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Begin = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/login`);
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="flex flex-col h-full bg-[#3F7856]">
                    <div className="h-full flex flex-col items-center justify-center">
                        <div>
                            <img src={PomegrantLogo} alt="Pomegrant Logo" className="h-259 w-auto" />
                        </div>
                        <div><Button
                            className="bg-[#7EC384] hover:bg-[#6db073] text-base py-6 px-6 border-none"
                            onClick={handleClick}
                        >
                            Find Grants
                            <div className="ml-2">
                                <ArrowRight></ArrowRight>
                            </div>
                        </Button></div>
                    </div>
                </div>
            </PhoneFrame>
        </div>
    );
};

export default Begin;
