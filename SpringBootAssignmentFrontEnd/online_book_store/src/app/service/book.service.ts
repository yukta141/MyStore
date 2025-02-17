import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Book } from '../model/book';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCustomerDetails(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getAllCards/${category}`);
  }

  getProductDetails(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/showBookbyId?bid=${bookId}`);
  }

  submitOrder(orderList: Order[], userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submitOrder/${userId}`, orderList);
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/getorder/${userId}`);
  }

  getSeries():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/getSeries`)
  }

  getBookSeriesDetails(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/series/${bookId}`);
  }
  
}
