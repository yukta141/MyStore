import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

//   getAllOrders(): Observable<Order[]>{
//     return this.http.get<Order[]>(`${this.baseUrl}/getAllOrder`)
// }
  getUsersCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/userCount`);
  }

  getSellerCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sellerCount`);
  }

}
