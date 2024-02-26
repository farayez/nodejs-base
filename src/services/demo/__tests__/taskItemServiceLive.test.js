import { syncDatabase } from '#utils/tests/setupTestDatabase.js';
import {
    getItem,
    getItems,
    addItem,
    udpateItem,
    deleteItem,
} from '../taskItemService.js';

describe('it performs CRUD operations on model successfully', () => {
    beforeEach(function () {
        return syncDatabase();
    });

    afterEach(function () {
        return syncDatabase();
    });

    const itemSample1 = {
        id: 1,
        name: 'sample 1',
        longDescription: 'long des 1',
        completed: false,
    };

    const itemSample2 = {
        id: 1,
        name: 'sample 2',
        longDescription: 'long des 2',
        completed: true,
    };

    it('performs Create and Read operation', async function () {
        let result = await addItem(itemSample1);
        expect(result).toMatchObject(itemSample1);

        result = await getItem(1);
        expect(result).toMatchObject(itemSample1);

        result = await getItems();
        expect(result).toHaveLength(1);
        expect(result).toContainObject(itemSample1);
    });

    it('performs Create and Update operation', async function () {
        let result = await addItem(itemSample1);
        result = await getItems();
        expect(result).toHaveLength(1);

        result = await udpateItem(1, {
            name: itemSample2.name,
            longDescription: itemSample2.longDescription,
            completed: itemSample2.completed,
        });

        expect(result).toMatchObject(itemSample2);

        result = await getItem(1);
        expect(result).toMatchObject(itemSample2);
    });

    it('performs Create and Delete operation', async function () {
        let result = await addItem(itemSample1);
        expect(await getItems()).toHaveLength(1);

        result = await deleteItem(1);
        expect(result).toEqual(true);
        expect(await getItems()).toHaveLength(0);
    });
});
