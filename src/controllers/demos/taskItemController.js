import taskItemService from '#services/demo/taskItemService.js';

async function addTaskItem(req, res) {
    let result = await taskItemService.addItem(req.body);

    res.json(result);
}

async function getTaskItems(req, res) {
    let result;

    if (req?.param?.id) {
        result = await taskItemService.getItem(req.param.id);
        res.json(result);
        return;
    }

    result = await taskItemService.getItems();
    res.json(result);
}

async function updateTaskItem(req, res) {
    let result = await taskItemService.updateItem(req.param.id, req.body);
    res.json(result);
}

async function deleteTaskItem(req, res) {
    let result = await taskItemService.deleteItem(req.param.id);
    res.json({ status: result });
}

export default {
    getTaskItems,
    addTaskItem,
    updateTaskItem,
    deleteTaskItem,
};
