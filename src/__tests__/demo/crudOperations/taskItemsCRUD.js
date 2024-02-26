import models from '#models';

export async function getItems() {
    return await models.TaskItem.findAll();
}

export async function getItem(id) {
    return await models.TaskItem.findByPk(id);
}

export async function addItem(data) {
    let item = models.TaskItem.build({
        name: data.name,
        longDescription: data.longDescription,
    });
    return await item.save();
}

export async function udpateItem(id, data) {
    const item = await models.TaskItem.findByPk(id);
    item.completed = data.completed ?? item.completed;
    item.name = data.name ?? item.name;
    item.longDescription = data.longDescription ?? item.longDescription;

    return await item.save();
}

export async function deleteItem(id) {
    let item = await models.TaskItem.findByPk(id);

    await item.destroy();

    return true;
}
