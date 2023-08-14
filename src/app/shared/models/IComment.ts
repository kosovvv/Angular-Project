export interface IComment {
    _id: string;
    authorId: string;
    authorName: string;
    itemId: string;
    description: string;
    createdAt: Date
};