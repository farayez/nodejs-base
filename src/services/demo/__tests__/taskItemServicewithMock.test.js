import { jest } from '@jest/globals';
import mockTaskItem from '#models/__mocks__/taskItem.js';

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

let modelFunctions = {
    save: jest.fn(),
    destroy: jest.fn(),
};

let modelInstance = {
    ...itemSample1,
    ...modelFunctions,
};

mockTaskItem(modelInstance);

// Import modules after setting up mocks
const { default: modelsMock } = await import('#models');
const { getItem, getItems, addItem, udpateItem, deleteItem } = await import(
    '../taskItemService.js'
);

describe('it performs CRUD operations on mock model successfully', () => {
    beforeEach(() => {
        modelInstance = {
            ...itemSample1,
            ...modelFunctions,
        };
        modelInstance.save.mockRestore();
    });

    it('performs Read one operation', async function () {
        jest.spyOn(modelsMock.TaskItem, 'findByPk').mockReturnValue(
            modelInstance,
        );

        let result = await getItem(2);
        expect(modelsMock.TaskItem.findByPk.mock.calls.length).toBe(1);
        expect(modelsMock.TaskItem.findByPk.mock.calls[0][0]).toEqual(2);
        expect(result).toMatchObject(itemSample1);
    });

    it('performs Read all operation', async function () {
        let result = await getItems();
        expect(modelsMock.TaskItem.findAll.mock.calls.length).toBe(1);
        expect(result).toContainObject(itemSample1);
    });

    it('performs Create operation', async function () {
        jest.spyOn(modelInstance, 'save').mockReturnValue(modelInstance);

        let result = await addItem(itemSample1);
        expect(modelsMock.TaskItem.build.mock.calls.length).toBe(1);
        expect(modelsMock.TaskItem.build.mock.calls[0][0]).toMatchObject({
            name: itemSample1.name,
            longDescription: itemSample1.longDescription,
        });
        expect(modelInstance.save.mock.calls.length).toBe(1);
        expect(modelsMock.TaskItem.build).toHaveBeenCalledBefore(
            modelInstance.save,
        );
        expect(modelInstance.save.mock.contexts[0]).toMatchObject(itemSample1);

        expect(result).toMatchObject(itemSample1);
    });

    it('performs Update operation', async function () {
        jest.spyOn(modelsMock.TaskItem, 'findByPk').mockReturnValue(
            modelInstance,
        );
        jest.spyOn(modelInstance, 'save').mockReturnValue(itemSample2);

        let result = await udpateItem(2, {
            name: itemSample2.name,
            longDescription: itemSample2.longDescription,
            completed: itemSample2.completed,
        });
        expect(modelsMock.TaskItem.findByPk.mock.calls.length).toBe(1);
        expect(modelsMock.TaskItem.findByPk.mock.calls[0][0]).toEqual(2);
        expect(modelsMock.TaskItem.findByPk).toHaveBeenCalledBefore(
            modelInstance.save,
        );
        expect(modelInstance.save.mock.contexts[0]).toMatchObject(itemSample2);
        expect(result).toMatchObject(itemSample2);
    });

    it('performs Delete operation', async function () {
        jest.spyOn(modelsMock.TaskItem, 'findByPk').mockReturnValue(
            modelInstance,
        );

        let result = await deleteItem(2);
        expect(modelsMock.TaskItem.findByPk.mock.calls.length).toBe(1);
        expect(modelsMock.TaskItem.findByPk.mock.calls[0][0]).toEqual(2);
        expect(modelsMock.TaskItem.findByPk).toHaveBeenCalledBefore(
            modelInstance.destroy,
        );

        expect(modelInstance.destroy.mock.calls.length).toBe(1);
        expect(modelInstance.destroy.mock.contexts[0]).toMatchObject(
            itemSample1,
        );
        expect(result).toBe(true);
    });
});
