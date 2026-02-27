import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const handleLogin = async () => {
        const resultAction = await dispatch(login({ email, password }));

        if (login.fulfilled.match(resultAction)) {
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
                <CardContent className="space-y-6">
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

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <Button
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-zinc-200"
                        onClick={handleLogin}
                    >
                        {loading ? "Signing in..." : "Enter"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}