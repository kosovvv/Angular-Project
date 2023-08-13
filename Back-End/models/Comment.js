const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema({
    authorId: { type: ObjectId, ref: 'User', required: true },
    authorName: {type: String, required: true},
    itemId: {type: ObjectId, ref: 'Item', required: true},
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] },
    createdAt: {type: Date, required: true}
})
const Comment = model('Comment', commentSchema);
module.exports = Comment;