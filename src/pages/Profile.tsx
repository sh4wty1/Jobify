import { useAppSelector } from "../store/hooks";

export default function Profile() {
    const user = useAppSelector((s) => s.auth.user);

    return (
        <div>
            <h2 className="text-2xl font-bold">Profile</h2>
            <p>User: {user}</p>
        </div>
    );
}