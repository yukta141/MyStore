export class Notification {
    notificationId: number;
    userId: number;
    orderId:number;
    bookId: number;
    bookName: string;
    message: string;
    bookSeries: string;
    status:string;

    constructor(
        notificationId: number,
        userId: number,
        orderId:number,
        bookId: number,
        bookName: string,
        message: string,
        bookSeries: string,
        status:string
      ) {
        this.notificationId = notificationId;
        this.userId = userId;
        this.orderId=orderId;
        this.bookId = bookId;
        this.bookName = bookName;
        this.message = message;
        this.bookSeries = bookSeries;
        this.status=status;
      }
}
