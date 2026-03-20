export interface Task {
    id: number;
    title: string;
    status: 'pending' | 'in-progress' | 'done';
    created_at: Date;
    user_id: number | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    created_at: Date;
}

export interface CreateTaskDTO {
    title: string;
    status?: 'pending' | 'in-progress' | 'done';
    user_id?: number;
}

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}