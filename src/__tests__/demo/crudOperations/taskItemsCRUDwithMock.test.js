import { jest } from '@jest/globals';
import taskItemMock from './taskItemMock.js';

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

var modelInstance = {
    ...itemSample1,
    save: jest.fn(),
};

taskItemMock(modelInstance);

// Import modules after setting up mocks
const { default: dbMock } = await import('#models');
const { getItem, getItems, addItem, udpateItem, deleteItem } = await import(
    './taskItemsCRUD.js'
);

describe('it performs CRUD operations on mock model successfully', () => {
    afterEach(() => {
        modelInstance.save.mockRestore();
    });

    it('performs Read one operation', async function () {
        let result = await getItem(2);
        expect(dbMock.TaskItem.findByPk.mock.calls.length).toBe(1);
        expect(dbMock.TaskItem.findByPk.mock.calls[0][0]).toEqual(2);
        expect(result).toMatchObject(itemSample1);
    });

    it('performs Read all operation', async function () {
        let result = await getItems();
        expect(dbMock.TaskItem.findAll.mock.calls.length).toBe(1);
        expect(result).toContainObject(itemSample1);
    });

    it('performs Create operation', async function () {
        jest.spyOn(modelInstance, 'save').mockReturnValue(itemSample1);
        let result = await addItem(itemSample1);
        expect(dbMock.TaskItem.build.mock.calls.length).toBe(1);
        expect(dbMock.TaskItem.build.mock.calls[0][0]).toMatchObject({
            name: itemSample1.name,
            longDescription: itemSample1.longDescription,
        });
        expect(modelInstance.save.mock.calls.length).toBe(1);
        expect(dbMock.TaskItem.build).toHaveBeenCalledBefore(
            modelInstance.save,
        );
        expect(modelInstance.save.mock.contexts[0]).toMatchObject(itemSample1);

        expect(result).toMatchObject(itemSample1);
    });

    it('performs Update operation', async function () {
        jest.spyOn(modelInstance, 'save').mockReturnValue(itemSample2);
        let result = await udpateItem(2, {
            name: itemSample2.name,
            longDescription: itemSample2.longDescription,
            completed: itemSample2.completed,
        });
        expect(dbMock.TaskItem.findByPk.mock.calls.length).toBe(1);
        expect(dbMock.TaskItem.findByPk.mock.calls[0][0]).toEqual(2);
        expect(dbMock.TaskItem.findByPk).toHaveBeenCalledBefore(
            modelInstance.save,
        );
        expect(modelInstance.save.mock.contexts[0]).toMatchObject(itemSample2);
        expect(result).toMatchObject(itemSample2);
    });
});
