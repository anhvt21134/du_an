export interface IProduct {
    _id?: string;
    name: string;
    author: string;
    price: number;
    image?: string;
    quantity: number;
    description: string;
    categoryId?:string | number;
}