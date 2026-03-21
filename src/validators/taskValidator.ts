import AppError from '../utils/AppError';

interface TaskData {
    title?: string;
}

export const validateTask = (data: TaskData): void => {
    if (!data.title) {
        throw new AppError('Title is required', 400);
    }

    if (data.title.length < 3) {
        throw new AppError('Title must be at least 3 characters', 400);
    }
};