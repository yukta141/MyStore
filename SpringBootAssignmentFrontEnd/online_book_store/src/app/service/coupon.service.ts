import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from '../model/coupon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addCoupon(coupon: Coupon): Observable<Coupon> {
    return this.http.post<Coupon>(`${this.baseUrl}/addCoupon`, coupon);
  }

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(`${this.baseUrl}/getCoupons`);
  }

  deleteCoupon(couponId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteCoupon/${couponId}`, {
      responseType: 'text' as 'json',
    });
  }
}
