const commentController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, create, getById, update, deleteById, getByUserId, getByProductId } = require('../services/commentService');
const { parseError } = require('../util/parser');


commentController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await getByUserId(userId);
    }
    res.json(items);
});

commentController.get('/:id', async (req, res, next) => {
    const item = await getByProductId(req.params.id);
    res.json(item);
});

commentController.post('/', hasUser(), async (req, res) => {
   
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await create(data);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

commentController.put('/:id', hasUser(), async (req, res, next) => {
    const item = await getById(req.params.id);
    if (req.user._id != item._ownerId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        const result = await update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

commentController.delete('/:id', hasUser(), async (req, res) => {
    const item = await getById(req.params.id);
    if (req.user._id != item.authorId) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

module.exports = commentController;