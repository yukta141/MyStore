export class Coupon {
  couponId?: number;
  couponName: string;
  couponCode: string;
  couponDiscount: number;
  couponDescription:string;
  couponExpirationDate: string;
  conditionType?: string;
  conditionValue?: string; 


  constructor(
    couponName: string,
    couponCode: string,
    couponDiscount: number,
    couponDescription:string,
    couponExpirationDate: string,
    conditionType?:string,
    conditionValue?:string
  ) {
    this.couponName = couponName;
    this.couponCode = couponCode;
    this.couponDiscount = couponDiscount;
    this.couponDescription=couponDescription;
    this.couponExpirationDate = couponExpirationDate;
    this.conditionType= conditionType;
    this.conditionValue= conditionValue;
  }
}
