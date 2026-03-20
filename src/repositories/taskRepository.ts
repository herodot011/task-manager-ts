import pool from '../config/db';
import { Task, CreateTaskDTO } from '../types';

export const findAll = async (): Promise<Task[]> => {
    const results = await pool.query('SELECT * FROM tasks');
    return results.rows;
}

export const findById = async (id: number): Promise<Task | null> => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
}

export const create = async (data: CreateTaskDTO): Promise<Task> => {
    const { title, status, user_id } = data;
    const result = await pool.query(
        `INSERT INTO tasks (title, status, user_id)
        VALUES($1, $2, $3)
        RETURNING *`,
        [title, status || 'pending', user_id || null]
    );
    return result.rows[0];
}

export const remove = async (id: number): Promise<number> => {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1',
        [id]
    );
    return result.rowCount?? 0;
}

export const update = async (id: number, data: Partial<Task>): Promise<Task> => {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key in data) {
        fields.push(`${key} = $${index}`);
        values.push(data[key as keyof Task]);
        index++;
    }
    values.push(id);

    const query = `
        UPDATE tasks
        SET ${fields.join(', ')}
        WHERE id = $${index}
        RETURNING *
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
}