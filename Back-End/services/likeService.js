const Like = require('../models/Like');

async function getById(id) {
    return Like.findById(id);
}

async function getByUserId(userId) {
    return Like.find({ authorId: userId });
}

async function getByProductId(productId) {
    console.log(productId);
    return Like.find({ itemId: productId });
}

async function create(item) {
    return Like.create(item);
}

async function deleteById(id) {
    return Like.findByIdAndDelete(id);
}
async function hasAuthorLikedItem(authorId, itemId) {
    const count = await Like.countDocuments({ authorId, itemId });
    return count > 0;
}

module.exports = {
    getById,
    getByUserId,
    create,
    deleteById,
    getByProductId,
    hasAuthorLikedItem
};