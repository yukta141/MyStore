export class Subscription {
    subscriptionId?:number;
    userId:number;
    bookId:number;

    constructor(userId:number,bookId:number){
        this.userId=userId;
        this.bookId=bookId;

    }
}


