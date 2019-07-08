const APIError = require('../rest').APIError;
const model = require('../model');
var Todos = model.Todos
module.exports = {
    'GET /api/todos': async (ctx, next) => {
        var todos = await Todos.findAll();

        ctx.rest({
            todos: todos
        });
    },

    'POST /api/todos': async (ctx, next) => {
        var t = ctx.request.body,
            res;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }
        res = await Todos.create({
            name: t.name.trim(),
            description: t.description.trim()
        });
        ctx.rest(res);
    },

    'PUT /api/todos/:id': async (ctx, next) => {
        var t = ctx.request.body, res;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }
        res = await Todos.upert({
            name:t.name,
            description:t.description,
            id:ctx.params.id
        });

        ctx.rest(res);
    },

    'DELETE /api/todos/:id': async (ctx, next) => {
        var i,res;
        res = await Todos.destroy({
            where:{
                id:ctx.params.id
            }
        });
        ctx.rest(res);
    }
}
