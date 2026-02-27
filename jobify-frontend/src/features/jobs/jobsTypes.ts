export interface Job {
    id: number;
    title: string;
    companyName: string;
    company?: string;
    description: string;
    fullDescription?: string;
    level?: string;
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
    bio?: string;
    avatarUrl?: string;
}
