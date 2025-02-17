import { CartItem } from './cart-item';
import { Coupon } from './coupon';

export class Cart {
  id!: number;
  userId!: number;
  items: CartItem[]=[];
  totalPrice: number;
  couponId?:number;
  coupon?:Coupon;

  constructor(userId: number, items: CartItem[], totalPrice: number,couponId:number,coupon:Coupon) {
    this.userId = userId;
    this.items = items;
    this.totalPrice = totalPrice;
    this.couponId=couponId;
    this.coupon=coupon;
  }
}
