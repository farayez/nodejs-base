import { DataTypes } from 'sequelize';
import sequelize from './utils/sequelize.js';

const TaskItem = sequelize.define(
    'TaskItem',
    {
        name: DataTypes.STRING,
        longDescription: DataTypes.STRING,
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        // Other model options go here
    },
);

export default TaskItem;
