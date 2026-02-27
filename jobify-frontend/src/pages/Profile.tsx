import { useAppSelector } from "../store/hooks";

export default function Profile() {
    const { email, role } = useAppSelector((s) => s.auth);

    return (
        <div className="space-y-3">
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-zinc-300">Email: {email}</p>
            <p className="text-zinc-400">Role: {role}</p>
        </div>
    );
}
