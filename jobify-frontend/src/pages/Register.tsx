import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { register } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"CANDIDATE" | "COMPANY">("CANDIDATE");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleRegister = async () => {
        const resultAction = await dispatch(
            register({ name, email, password, role })
        );

        if (register.fulfilled.match(resultAction)) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                <CardContent className="space-y-6">
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                    />

                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-zinc-800 border-zinc-700"
                    />

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-zinc-200"
                        onClick={handleRegister}
                    >
                        {loading ? "Creating account..." : "Register"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}