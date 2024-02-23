import sequelize from '../sequelize.js';

export function syncDatabase() {
    return sequelize.sync({ force: true, match: /_test$/ });
}
