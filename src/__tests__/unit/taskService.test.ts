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
        // Arrange
        mockRepository.findAll.mockResolvedValue(mockTasks);

        // Act
        const result = await taskService.getAll({});

        // Assert
        expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            total: 3,
            page: 1,
            limit: 10,
            data: mockTasks,
        });
        });
    });
})