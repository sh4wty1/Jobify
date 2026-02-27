import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fetchMyProfile, updateMyProfile } from "@/services/userService";
import { showError, showSuccess } from "@/components/layout/ToastProvider";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await fetchMyProfile();
                setName(profile.name || "");
                setEmail(profile.email || "");
                setRole(profile.role || "");
                setBio(profile.bio || "");
                setAvatarUrl(profile.avatarUrl || "");
            } catch (error) {
                console.error(error);
                showError("Could not load profile.");
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleSave = async () => {
        try {
            const updated = await updateMyProfile({ name, bio, avatarUrl });
            setName(updated.name || "");
            setBio(updated.bio || "");
            setAvatarUrl(updated.avatarUrl || "");
            showSuccess("Profile updated successfully.");
        } catch (error) {
            console.error(error);
            showError("Could not update profile.");
        }
    };

    if (loading) {
        return <p className="text-zinc-400">Loading profile...</p>;
    }

    return (
        <Card className="max-w-2xl p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-6">
            <div className="flex items-center gap-4">
                <Avatar size="lg" className="size-16">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>{name.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-bold text-white">Meu Perfil</h2>
                    <p className="text-zinc-400">Edite seus dados de exibição</p>
                </div>
            </div>

            <div className="grid gap-4">
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <Input value={email} disabled placeholder="Email" />
                <Input value={role} disabled placeholder="Role" />
                <Input
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="Avatar URL"
                />
                <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Bio"
                    className="min-h-28"
                />
            </div>

            <Button onClick={handleSave} className="bg-white text-black hover:bg-zinc-200">
                <Save className="mr-2 h-4 w-4" /> Save changes
            </Button>
        </Card>
    );
}
