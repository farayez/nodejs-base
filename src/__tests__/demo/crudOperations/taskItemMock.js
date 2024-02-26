import { jest } from '@jest/globals';

export default (modelInstance) =>
    jest.unstable_mockModule('#models', () => ({
        default: {
            TaskItem: {
                findByPk: jest.fn(),
                findAll: jest.fn(() => [modelInstance]),
                build: jest.fn(() => modelInstance),
            },
        },
    }));
