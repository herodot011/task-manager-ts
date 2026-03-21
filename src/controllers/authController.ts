import { Request, Response } from 'express';
import * as authService from '../services/authService';
import catchAsync from '../utils/catchAsync';
import { validateRegister } from '../validators/authValidator';

export const register = catchAsync(async(req: Request, res: Response) => {
    validateRegister(req.body);
    const user = await authService.register(req.body);
    res.status(201).json({
        status: 'success',
        data: user
    })
})

export const login = catchAsync(async(req: Request, res: Response) => {
    const data = await authService.login(req.body);
     res.status(200).json({
        status: 'success',
        data
    })  
})