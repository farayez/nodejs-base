import { jest } from '@jest/globals';

// export const modelInstance = {
//     name: 'sample 1',
//     longDescription: 'long des 1',
//     completed: false,
//     save: jest.fn(),
// };

export default (modelInstance) =>
    jest.unstable_mockModule('#models', () => ({
        default: {
            TaskItem: {
                findByPk: jest.fn(() => modelInstance),
                findAll: jest.fn(() => [modelInstance]),
                build: jest.fn(() => modelInstance),
            },
        },
    }));

// export default
