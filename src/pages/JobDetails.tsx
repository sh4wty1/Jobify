import { useParams } from "react-router-dom";

export default function JobDetails() {
    const { id } = useParams();

    return (
        <div>
            <h2 className="text-2xl font-bold">Job Details</h2>
            <p>Job ID: {id}</p>
        </div>
    );
}