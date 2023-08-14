export interface IProduct {
    _id: string;
    make: string;
    model: string;
    year: Number;
    description: string;
    price: Number;
    img: string;
    material: string;
    _ownerId: string | null;
};