import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/intro`);
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold mb-10 text-[#45625D]">Welcome to Pomegrant!</p>
                        <Input
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-5 py-5"
                        />
                        <Input
                            placeholder="Enter Your Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mb-5 py-5"
                        />
                        <Input
                            placeholder="Enter Your Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-8 py-5"
                        />

                        <Button
                            className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 border-none"
                            onClick={handleClick}
                        >
                            Sign Up
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

export default SignUp;
