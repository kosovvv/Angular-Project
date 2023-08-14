const { Schema, model, Types: { ObjectId } } = require('mongoose');

const likeSchema = new Schema({
    authorId: { type: ObjectId, ref: 'User', required: true },
    authorName: {type: String, required: true},
    itemId: {type: ObjectId, ref: 'Item', required: true}
})
const Like = model('Like', likeSchema);
module.exports = Like;

