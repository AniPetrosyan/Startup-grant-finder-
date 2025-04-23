import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "@/lib/UserProfileContext";

const SignUp = () => {
    const { updateProfile } = useUserProfile();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        // Update profile with user information
        updateProfile({
            firstName,
            lastName,
            email
        });
        navigate(`/intro`);
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold mb-10 text-[#45625D]">Welcome to Pomegrant!</p>
                        
                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">First Name</label>
                            <Input
                                placeholder="Enter Your First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Last Name</label>
                            <Input
                                placeholder="Enter Your Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input
                                placeholder="Enter Your Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Phone Number</label>
                            <Input
                                placeholder="Enter Your Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <div className="w-full mb-8">
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <Input
                                placeholder="Enter Your Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="py-5"
                            />
                        </div>

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
