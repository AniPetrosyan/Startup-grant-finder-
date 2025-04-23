import PhoneFrame from "@/components/PhoneFrame";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserProfile } from "@/lib/UserProfileContext";

const MOCK_USERS = {
    "pennkey@sas.upenn.edu": {
        firstName: "Emily",
        lastName: "Smith",
        email: "pennkey@sas.upenn.edu",
        password: "password123"
    }
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();
    const { updateProfile } = useUserProfile();

    const handleClick = () => {
        // Reset error
        setError("");

        const user = MOCK_USERS[email];
        if (user) {
            // Update profile with user information
            updateProfile({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            });
            navigate(`/home`);
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen h-screen w-screen flex items-center justify-center bg-[#f3f3f3]">
            <PhoneFrame>
                <div className="px-8 flex flex-col h-full">
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold mb-10 text-[#45625D]">Login</p>
                        
                        {error && (
                            <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <Input
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <div className="w-full mb-5">
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <Input
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="py-5"
                            />
                        </div>

                        <Button
                            className="w-full bg-[#7EC384] hover:bg-[#6db073] text-base py-6 mt-5 border-none"
                            onClick={handleClick}
                        >
                            Login
                        </Button>
                    </div>
                    <div className="overflow-auto pb-10 flex items-center justify-center">
                        <p className="font-medium mb-2 text-[#0D171C]">Don't have an account? <Link to="/signup" className="text-[#3F7856]">Sign Up</Link></p>
                    </div>
                </div>
            </PhoneFrame>
        </div>
    );
};

export default Login;
