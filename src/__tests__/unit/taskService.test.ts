import * as taskService from '../../services/taskService';
import * as taskRepository from '../../repositories/taskRepository';

jest.mock('../../repositories/taskRepository');

const mockRepository = taskRepository as jest.Mocked<typeof taskRepository>;

const mockTask = {
  id: 1,
  title: 'Buy milk',
  status: 'pending' as const,
  created_at: new Date(),
  user_id: null,
};

const mockTasks = [
  mockTask,
  { ...mockTask, id: 2, title: 'Go to gym', status: 'in-progress' as const },
  { ...mockTask, id: 3, title: 'Read book', status: 'done' as const },
];

describe('TaskService', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('getAll', () => {

        it('should return all tasks with default pagination', async () => {
        
            mockRepository.findAll.mockResolvedValue(mockTasks);

            const result = await taskService.getAll({});

            expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
            expect(result).toEqual({
                total: 3,
                page: 1,
                limit: 10,
                data: mockTasks,
            });
        });

        it('should filter tasks by status', async () => {
            mockRepository.findAll.mockResolvedValue(mockTasks);
            
            const result = await taskService.getAll({ status: 'done' });

            expect(result.total).toBe(1);
            expect(result.data[0].status).toBe('done');
        });

        it('should return correct page of tasks', async () => {
            mockRepository.findAll.mockResolvedValue(mockTasks);

            const result = await taskService.getAll({ page: 2, limit: 2 }) as any;

            expect(result.data).toHaveLength(1);
            expect(result.data[0].id).toBe(3);
        });

        it('should return empty data array when no tasks match filter', async () => {
            mockRepository.findAll.mockResolvedValue(mockTasks);

            const result = await taskService.getAll({ status: 'in-progress' }) as any;

            expect(result.total).toBe(1);
            expect(result.data[0].title).toBe('Go to gym');
        });
    });

    describe('findById', () => {

        it('should return task when it exists', async () => {
            mockRepository.findById.mockResolvedValue(mockTask);

            const result = await taskService.findById(1);

            expect(result).toEqual(mockTask);
            expect(mockRepository.findById).toHaveBeenCalledWith(1);
        });

        it('should throw AppError 404 when task not found', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(taskService.findById(999)).rejects.toMatchObject({
            statusCode: 404,
            message: 'Task not found',
            });
        });
    });

    describe('create', () => {

        it('should create and return new task', async () => {
            const createDto = { title: 'New task', status: 'pending' as const };
            mockRepository.create.mockResolvedValue({ ...mockTask, ...createDto });

            
            const result = await taskService.create(createDto);

            
            expect(mockRepository.create).toHaveBeenCalledWith(createDto);
            expect(result.title).toBe('New task');
        });
    });

    describe('remove', () => {

        it('should delete task and return 1', async () => {
            mockRepository.remove.mockResolvedValue(1);
            
            const result = await taskService.remove(1);

            expect(result).toBe(1);
            expect(mockRepository.remove).toHaveBeenCalledWith(1);
        });

        it('should throw AppError 404 when task to delete not found', async () => {
            mockRepository.remove.mockResolvedValue(0);

            await expect(taskService.remove(999)).rejects.toMatchObject({
                statusCode: 404,
                message: 'Task not found',
            });
        });
    });
});