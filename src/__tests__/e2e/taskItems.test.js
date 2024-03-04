import { default as supertest } from 'supertest';
import { syncDatabase } from '#utils/tests/setupTestDatabase.js';
import app from '#/app.js';
import { faker } from '@faker-js/faker';
import models from '#models';
const request = supertest(app);

const itemSample1 = {
    name: faker.vehicle.manufacturer(),
    longDescription: faker.vehicle.color(),
};
const itemSample2 = {
    name: faker.vehicle.manufacturer(),
    longDescription: faker.vehicle.color(),
};

describe('task-items endpoints work correctly', function () {
    it('gets all task items using get all endpoint', async () => {
        await syncDatabase();
        models.TaskItem.create(itemSample1);
        models.TaskItem.create(itemSample2);

        const response = await request.get('/api/task-items');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body).toContainObject({ ...itemSample1, id: 1 });
        expect(response.body).toContainObject({ ...itemSample2, id: 2 });
    });

    it('gets one task item using get one endpoint', async () => {
        await syncDatabase();
        models.TaskItem.create(itemSample1);
        models.TaskItem.create(itemSample2);

        const response = await request.get('/api/task-items/2');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({ ...itemSample2, id: 2 });
    });

    it('it creates task item using create endpoint', async () => {
        await syncDatabase();

        const response = await request
            .post('/api/task-items')
            .send(itemSample1);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            ...itemSample1,
            id: 1,
            completed: false,
        });
        const taskItemInDb = await models.TaskItem.findByPk(response.body.id);
        expect(taskItemInDb).toMatchObject({
            ...itemSample1,
            id: 1,
            completed: false,
        });
    });

    it('it updates task item using update endpoint', async () => {
        await syncDatabase();
        const newDescription = faker.vehicle.vin();
        models.TaskItem.create(itemSample1);
        models.TaskItem.create(itemSample2);

        const response = await request.patch('/api/task-items/2').send({
            longDescription: newDescription,
            completed: true,
        });

        const expectedNewItem = {
            id: 2,
            name: itemSample2.name,
            longDescription: newDescription,
            completed: true,
        };

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(expectedNewItem);
        const taskItemInDb = await models.TaskItem.findByPk(response.body.id);
        expect(taskItemInDb).toMatchObject(expectedNewItem);
    });

    it('it deletes task item using delete endpoint', async () => {
        await syncDatabase();
        models.TaskItem.create(itemSample1);
        models.TaskItem.create(itemSample2);

        const response = await request.delete('/api/task-items/1').send();

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        const taskItemsInDb = await models.TaskItem.findAll();
        expect(taskItemsInDb).toHaveLength(1);
        expect(taskItemsInDb).not.toContainObject(itemSample1);
        expect(taskItemsInDb).toContainObject(itemSample2);
    });
});
