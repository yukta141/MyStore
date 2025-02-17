export class Feedback {
    feedbackId:number;
    feedbackRating:string;
    feedbackText:string;
    userId:number;
    userName:string;
    recommend:boolean;

    constructor(feedbackId:number,feedbackRating:string,feedbackText:string,userId:number,userName:string,recommend:boolean)
    {
        this.feedbackId=feedbackId;
        this.feedbackRating=feedbackRating;
        this.feedbackText=feedbackText;
        this.userId=userId;
        this.userName=userName;
        this.recommend=recommend;
    }
}
