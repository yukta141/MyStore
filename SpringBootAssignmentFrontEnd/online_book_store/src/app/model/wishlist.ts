import { Book } from "./book";

export class Wishlist {
    wishlistId:number;
    userId:number;
    book:Book;

    constructor(wishlistId:number,userId:number,book:Book)
    {
        this.wishlistId=wishlistId;
        this.userId=userId;
        this.book=book;
    }
}
