import { jest } from '@jest/globals';

export default () =>
    jest.unstable_mockModule('#services/demo/taskItemService.js', () => ({
        default: {
            getItems: jest.fn(),
            getItem: jest.fn(),
            addItem: jest.fn(),
            updateItem: jest.fn(),
            deleteItem: jest.fn(),
        },
    }));
