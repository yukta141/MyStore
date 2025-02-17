import { Book } from './book';
import { User } from './user';

export class CartItem {
  id?: number;
  quantity!: number;
  book!: Book;
  user:User;

  constructor(id: number, quantity: number, book: Book,user:User) {
    this.id = id;
    this.quantity = quantity;
    this.book = book;
    this.user=user;
  }
}
