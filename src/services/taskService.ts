import * as taskRepository from '../repositories/taskRepository';
import { Task, CreateTaskDTO } from '../types';
import AppError from '../utils/AppError';

interface GetAllParams {
    status?: string;
    page?: number;
    limit?: number;
}

interface PaginatedResult {
    total: number;
    page: number;
    limit: number;
    data: Task[];
}


export const getAll = async({ status, page = 1, limit = 10 }: GetAllParams): Promise<PaginatedResult> => {
    let tasks = await taskRepository.findAll();

    if(status) {
        tasks = tasks.filter(task => task.status === status);
    }

    const start = (page - 1) * limit;

    return {
        total: tasks.length,
        page,
        limit,
        data: tasks.slice(start, start + limit)
    };
};

export const findById = async (id: number): Promise<Task> => {
    const task = await taskRepository.findById(id);
    if(!task){
        throw new AppError('Task not found', 404);
    }
    return task;
};

export const create = async(data: CreateTaskDTO): Promise<Task> => {
    return await taskRepository.create(data);
};

export const remove = async(id: number): Promise<number> => {
    const deleted = await taskRepository.remove(id);
    if(!deleted) {
        throw new AppError('Task not found', 404);
    }
    return deleted;
};

export const update = async(id: number, data: Partial<Task>): Promise<Task> => {
    const task = await taskRepository.findById(id);
    if(!task) {
        throw new AppError('Task not found', 404);
    }
    return await taskRepository.update(id, data);
}
