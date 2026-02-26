import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { login } from "../features/auth/authSlice";
import { useAppDispatch } from "../store/hooks";

export default function Login() {
    const [name, setName] = useState("");
    const [role, setRole] = useState<"CANDIDATE" | "COMPANY">("CANDIDATE");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!name.trim()) return;
        dispatch(login({ user: name, role }));
        navigate("/dashboard");
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                <CardContent className="space-y-6">
                    <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                        className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded"
                    >
                        <option value="CANDIDATE">Candidate</option>
                        <option value="COMPANY">Company</option>
                    </select>

                    <Button
                        className="w-full bg-white text-black hover:bg-zinc-200"
                        onClick={handleLogin}
                    >
                        Enter
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}