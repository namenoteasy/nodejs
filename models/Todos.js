const db = require('../db');

module.exports = db.defineModel('todos', {
    id: db.ID,
    name: db.STRING(100),
    description: db.STRING(255),
});
