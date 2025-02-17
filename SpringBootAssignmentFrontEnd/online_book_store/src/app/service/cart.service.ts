import { Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) {}

  addItemToCart(userId: number, cartItems:{bookId:number,quantity:number}[]): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/${userId}/add`, cartItems);
  }

  removeItemFromCart(userId: number, id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/${userId}/remove/${id}`);
  }

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`);
  }

  applyCoupon(couponCode:string): Observable<Cart> {
    const userId = Number(sessionStorage.getItem('userId'));
    return this.http.get<Cart>(`${this.baseUrl}/applyCoupon/${userId}/${couponCode}`);
  }

  removeAllCartItemsForUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removecartitem/${userId}`);
  }

  removeCoupon(userId: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/removeCoupon/${userId}`, {});
}


}
