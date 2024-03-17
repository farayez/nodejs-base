import { jest } from '@jest/globals';
import mockTaskItemService from '#services/demo/__mocks__/taskItemService.js';

const itemSample1 = {
    name: 'sample 1',
    longDescription: 'long des 1',
    completed: false,
};

const itemSample2 = {
    name: 'sample 2',
    longDescription: 'long des 2',
    completed: true,
};

mockTaskItemService();

// Import modules after setting up mocks
const { default: taskItemService } = await import(
    '#services/demo/taskItemService.js'
);
const { default: taskItemsController } = await import(
    '../taskItemController.js'
);

describe('taskItems controller communicates with taskItemService properly', () => {
    beforeEach(() => {});

    it('getTaskItems endpoint properly calls getItems method in service when id is absent', async function () {
        const res = { json: jest.fn() };
        taskItemService.getItems.mockReturnValueOnce([
            itemSample1,
            itemSample2,
        ]);

        await taskItemsController.getTaskItems({}, res);

        expect(taskItemService.getItems.mock.calls.length).toBe(1);
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json.mock.calls[0][0]).toContainObject(itemSample1);
    });

    it('getTaskItems endpoint properly calls getItem method in service when id is present', async function () {
        const res = { json: jest.fn() };
        taskItemService.getItem.mockReturnValueOnce(itemSample2);

        await taskItemsController.getTaskItems({ params: { id: 1 } }, res);

        expect(taskItemService.getItem.mock.calls.length).toBe(1);
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json.mock.calls[0][0]).toMatchObject(itemSample2);
    });

    it('addTaskItem endpoint calls addItem method in service properly', async function () {
        const res = { json: jest.fn() };
        taskItemService.addItem.mockReturnValueOnce({ id: 1, ...itemSample1 });

        await taskItemsController.addTaskItem({ body: itemSample1 }, res);

        expect(taskItemService.addItem.mock.calls.length).toBe(1);
        expect(taskItemService.addItem.mock.calls[0][0]).toMatchObject(
            itemSample1,
        );
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json.mock.calls[0][0]).toMatchObject({
            id: 1,
            ...itemSample1,
        });
    });

    it('updateTaskItem endpoint calls updateItem method in service properly', async function () {
        const res = { json: jest.fn() };
        taskItemService.updateItem.mockReturnValueOnce({
            id: 1,
            ...itemSample2,
        });

        await taskItemsController.updateTaskItem(
            { params: { id: 1 }, body: itemSample2 },
            res,
        );

        expect(taskItemService.updateItem.mock.calls.length).toBe(1);
        expect(taskItemService.updateItem.mock.calls[0][0]).toBe(1);
        expect(taskItemService.updateItem.mock.calls[0][1]).toMatchObject(
            itemSample2,
        );
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json.mock.calls[0][0]).toMatchObject({
            id: 1,
            ...itemSample2,
        });
    });

    it('deleteTaskItem endpoint calls deleteItem method in service properly', async function () {
        const res = { json: jest.fn() };
        taskItemService.deleteItem.mockReturnValueOnce(true);

        await taskItemsController.deleteTaskItem({ params: { id: 1 } }, res);

        expect(taskItemService.deleteItem.mock.calls.length).toBe(1);
        expect(taskItemService.deleteItem.mock.calls[0][0]).toBe(1);
        expect(res.json.mock.calls.length).toBe(1);
        expect(res.json.mock.calls[0][0]).toMatchObject({ status: true });
    });
});
