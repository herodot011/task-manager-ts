import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import catchAsync from '../utils/catchAsync';
import { validateTask } from '../validators/taskValidator';

export const getAllTasks = catchAsync(async(req: Request, res: Response) => {
    const { status, page, limit } = req.query;

    const tasks = await taskService.getAll({
        status: status as string,
        page: page? Number(page) : undefined,
        limit: limit? Number(limit) : undefined
    });
    res.json(tasks);
})

export const findById = catchAsync(async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = await taskService.findById(id);
    res.json(task);
})

export const createTask = catchAsync(async(req: Request, res: Response) => {
    validateTask(req.body);
    const task = await taskService.create({
    ...req.body,
    user_id: (req as any).user?.id
    });
    res.status(201).json(task);
})

export const deleteTask = catchAsync(async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    await taskService.remove(id);
    res.json({ message: 'Task deleted successfully' });
})

export const updateTask = catchAsync(async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    const task = await taskService.update(id, req.body);
    res.json(task);
})

