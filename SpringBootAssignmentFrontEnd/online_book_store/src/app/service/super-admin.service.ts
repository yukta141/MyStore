import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Revenue } from '../model/revenue';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllSellers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllSellers`);
  }

  blockUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/blockUser/${userId}`, null);
  }

  unblockUser(userId: number): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/unblockUser/${userId}`, null);
  }

  getAdminRevenue(month: number, year: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/revenueAdmin?month=${month}&year=${year}`);
  }

  getMonthlyRevenue(): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(`${this.baseUrl}/monthlyRevenue`);
  }
  // getOrdersBySeller():Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}/OrdersBySellerName`)
  // }

  getOrdersBySeller(): Observable<{ sellerName: string; orderCount: number }[]> {
    return this.http.get<{ sellerName: string; orderCount: number }[]>(`${this.baseUrl}/OrdersBySellerName`);
  }
  
}
