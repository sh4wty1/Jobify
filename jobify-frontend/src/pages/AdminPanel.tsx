import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Job, UserProfile } from "@/features/jobs/jobsTypes";
import { fetchJobs, deleteJobByAdmin } from "@/services/jobService";
import {
    deleteUserByAdmin,
    fetchUsersByAdmin,
    updateUserByAdmin,
} from "@/services/userService";
import { showError, showSuccess } from "@/components/layout/ToastProvider";

export default function AdminPanel() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    const [savingUser, setSavingUser] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("CANDIDATE");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    const selectedUserId = useMemo(() => selectedUser?.id, [selectedUser]);

    const loadData = async () => {
        try {
            const [jobsData, usersData] = await Promise.all([fetchJobs(), fetchUsersByAdmin()]);
            setJobs(jobsData);
            setUsers(usersData);
        } catch (error) {
            console.error(error);
            showError("Could not load admin data.");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!selectedUser) return;
        setName(selectedUser.name || "");
        setEmail(selectedUser.email || "");
        setRole(selectedUser.role || "CANDIDATE");
        setBio(selectedUser.bio || "");
        setAvatarUrl(selectedUser.avatarUrl || "");
    }, [selectedUser]);

    const handleDeleteJob = async (jobId: number) => {
        try {
            await deleteJobByAdmin(jobId);
            setJobs((prev) => prev.filter((j) => j.id !== jobId));
            showSuccess("Job removed.");
        } catch (error) {
            console.error(error);
            showError("Could not remove this job.");
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUserByAdmin(userId);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
            if (selectedUserId === userId) {
                setSelectedUser(null);
            }
            showSuccess("User removed.");
        } catch (error) {
            console.error(error);
            showError("Could not remove this user.");
        }
    };

    const handleSaveUser = async () => {
        if (!selectedUserId) return;

        setSavingUser(true);
        try {
            const updated = await updateUserByAdmin(selectedUserId, {
                name,
                email,
                role,
                bio,
                avatarUrl,
            });
            setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
            setSelectedUser(updated);
            showSuccess("User updated.");
        } catch (error) {
            console.error(error);
            showError("Could not update user.");
        } finally {
            setSavingUser(false);
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Admin Panel</h2>

            <section className="space-y-3">
                <h3 className="text-lg font-semibold">Job posts</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {jobs.map((job) => (
                        <Card key={job.id} className="p-4 bg-zinc-900 border-zinc-800 space-y-2">
                            <p className="text-zinc-100 font-medium">{job.title}</p>
                            <p className="text-zinc-400 text-sm">{job.companyName}</p>
                            <p className="text-zinc-500 text-sm line-clamp-2">{job.description}</p>
                            <Button
                                variant="destructive"
                                className="w-full"
                                onClick={() => handleDeleteJob(job.id)}
                            >
                                Remover vaga
                            </Button>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-semibold">Users</h3>
                <div className="grid lg:grid-cols-[280px_1fr] gap-4">
                    <Card className="p-3 bg-zinc-900 border-zinc-800 space-y-2">
                        {users.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`w-full text-left p-2 rounded-lg border ${
                                    selectedUserId === user.id
                                        ? "border-white text-white"
                                        : "border-zinc-800 text-zinc-400"
                                }`}
                            >
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs">{user.email}</p>
                            </button>
                        ))}
                    </Card>

                    <Card className="p-5 bg-zinc-900 border-zinc-800 space-y-3">
                        {!selectedUser ? (
                            <p className="text-zinc-500">Select an user to edit.</p>
                        ) : (
                            <>
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-800 p-2 rounded-md"
                                >
                                    <option value="CANDIDATE">CANDIDATE</option>
                                    <option value="COMPANY">COMPANY</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                <Input
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    placeholder="Avatar URL"
                                />
                                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />

                                <div className="grid grid-cols-2 gap-3">
                                    <Button onClick={handleSaveUser} disabled={savingUser}>
                                        Salvar alterações
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDeleteUser(selectedUser.id)}
                                    >
                                        Descadastrar
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            </section>
        </div>
    );
}
