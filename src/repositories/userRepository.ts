import prisma from '../config/prisma';
import { CreateUserDTO } from '../types';

// export const findByEmail = async(email: string): Promise<User | null> => {
//     const result = await pool.query(
//         'SELECT * FROM users WHERE email = $1',
//         [email]
//     );
//     return result.rows[0] || null;
// }
export const findByEmail = async(email: string) => {
    return prisma.users.findUnique({
        where: { email }
    });
}

// export const create = async(data: CreateUserDTO): Promise<User> => {
//     const { name, email, password } = data;
//     const result = await pool.query(`
//         INSERT INTO users (name, email, password)
//         VALUES($1, $2, $3)
//         RETURNING *`,
//         [name, email, password]
//     );
//     return result.rows[0];
// };

export const create = async(data: CreateUserDTO) => {
    return prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
};
