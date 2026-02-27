import { useEffect, useState } from "react";
import { Download, Save, Upload } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { downloadMyCv, fetchMyProfile, updateMyProfile, uploadMyCv } from "@/services/userService";
import { showError, showSuccess } from "@/components/layout/ToastProvider";

export default function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [cvFileName, setCvFileName] = useState("");
    const [hasCv, setHasCv] = useState(false);
    const [selectedCv, setSelectedCv] = useState<File | null>(null);
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
                setHasCv(!!profile.hasCv);
                setCvFileName(profile.cvFileName || "");
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

    const handleCvUpload = async () => {
        if (!selectedCv) {
            showError("Selecione um arquivo de CV primeiro.");
            return;
        }

        try {
            const updated = await uploadMyCv(selectedCv);
            setHasCv(!!updated.hasCv);
            setCvFileName(updated.cvFileName || selectedCv.name);
            setSelectedCv(null);
            showSuccess("CV enviado com sucesso.");
        } catch (error) {
            console.error(error);
            showError("Não foi possível enviar o CV.");
        }
    };

    const handleCvDownload = async () => {
        try {
            const { blob, fileName } = await downloadMyCv();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            showError("Não foi possível baixar o CV.");
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

            {role === "CANDIDATE" && (
                <div className="space-y-3 border-t border-zinc-800 pt-4">
                    <h3 className="text-sm font-semibold text-zinc-200">CV</h3>
                    <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedCv(e.target.files?.[0] || null)} />
                    <div className="flex gap-2">
                        <Button onClick={handleCvUpload}>
                            <Upload className="h-4 w-4 mr-2" /> Upload CV
                        </Button>
                        {hasCv && (
                            <Button variant="outline" onClick={handleCvDownload}>
                                <Download className="h-4 w-4 mr-2" /> Baixar CV {cvFileName ? `(${cvFileName})` : ""}
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Card>
    );
}
