const Comment = require('../models/Comment');


async function getAll() {
    return Comment.find({});
}

async function getByUserId(userId) {
    return Comment.find({ authorId: userId });
}

async function getById(id) {
    return Comment.findById(id);
}

async function getByProductId(productId) {
    console.log(productId);
    return Comment.find({ itemId: productId });
    
}

async function create(item) {
    return Comment.create(item);
}

async function update(id, item) {
    const existing = await Comment.findById(id);
    existing.description = item.description;
    return existing.save();
}

async function deleteById(id) {
    return Comment.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getByUserId,
    getById,
    create,
    update,
    deleteById,
    getByProductId
};