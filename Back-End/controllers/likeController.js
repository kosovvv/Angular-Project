const { getByUserId, getByProductId, create, getById, deleteById } = require('../services/likeService');
const { hasUser } = require('../middlewares/guards');
const likeController = require('express').Router();

likeController.get('/', async (req, res) => {
    let items = [];
    if (req.query.where) {
        const userId = JSON.parse(req.query.where.split('=')[1]);
        items = await getByUserId(userId);
    }
    res.json(items);
});

likeController.get('/:id', async (req, res, next) => {
    const item = await getByProductId(req.params.id);
    res.json(item);
});


likeController.post('/', hasUser(), async (req, res) => {
    console.log('working')
    try {
        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        const item = await create(data);
        res.json(item);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});

likeController.delete('/:id', hasUser(), async (req, res) => {
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


module.exports = likeController;