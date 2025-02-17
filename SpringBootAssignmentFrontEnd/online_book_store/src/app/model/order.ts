import { Book } from './book';
import { User } from './user';

export class Order {
  orderId?: number;
  book: Book;
  bookId:number;
  userId: number;
  groupId: number;
  user: User;
  orderStatus:string;
  placedDate:Date;
  estimatedDeliveryDate:Date;

  constructor(book: Book, bookId:number, userId: number, groupId: number, user: User,orderStatus:string='PLACED', placedDate:Date= new Date(), estimatedDeliveryDate:Date) {
    this.book = book;
    this.bookId=bookId;
    this.userId = userId;
    this.groupId = groupId;
    this.user = user;
    this.orderStatus=orderStatus;
    this.placedDate=placedDate;
    this.estimatedDeliveryDate=estimatedDeliveryDate;
  }
}
