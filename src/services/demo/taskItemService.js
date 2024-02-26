import models from '#models';

async function getItems() {
    return await models.TaskItem.findAll();
}

async function getItem(id) {
    return await models.TaskItem.findByPk(id);
}

async function addItem(data) {
    let item = models.TaskItem.build({
        name: data.name,
        longDescription: data.longDescription,
    });
    return await item.save();
}

async function updateItem(id, data) {
    const item = await models.TaskItem.findByPk(id);
    item.completed = data.completed ?? item.completed;
    item.name = data.name ?? item.name;
    item.longDescription = data.longDescription ?? item.longDescription;

    return await item.save();
}

async function deleteItem(id) {
    let item = await models.TaskItem.findByPk(id);

    await item.destroy();

    return true;
}

export default {
    getItem,
    getItems,
    addItem,
    updateItem,
    deleteItem,
};
