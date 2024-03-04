import taskItemService from '#services/demo/taskItemService.js';

async function addTaskItem(req, res) {
    let result = await taskItemService.addItem(req.body);

    res.json(result);
}

async function getTaskItems(req, res) {
    let result;

    if (req.params?.id) {
        result = await taskItemService.getItem(req.params.id);
        res.json(result);
        return;
    }

    result = await taskItemService.getItems();
    res.json(result);
}

async function updateTaskItem(req, res) {
    let result = await taskItemService.updateItem(req.params.id, req.body);
    res.json(result);
}

async function deleteTaskItem(req, res) {
    let result = await taskItemService.deleteItem(req.params.id);
    res.json({ status: result });
}

export default {
    getTaskItems,
    addTaskItem,
    updateTaskItem,
    deleteTaskItem,
};
