import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as userRepository from '../repositories/userRepository';
import { CreateUserDTO} from '../types';
import AppError from '../utils/AppError';

export const register = async(data: CreateUserDTO): Promise<object> => {
    const { name, email, password } = data;

    const existingEmail = await userRepository.findByEmail(email);
    if(existingEmail) {
        throw new AppError('Email already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
        name,
        email,
        password: hashedPassword
    })

    delete (user as any).password;
    return user;
}

export const login = async(data: { email: string, password: string }): Promise<object> => {
    const { email, password } = data;

    const user = await userRepository.findByEmail(email);
    if(!user) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
        throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d'}
    );

    return { token };
}