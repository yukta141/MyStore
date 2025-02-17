import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../model/category';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root',
})
export class AdminserviceService {
  private baseUrl = 'http://localhost:8080';

  books: Admin[] = [];

  constructor(private http: HttpClient) {}

  addProductDetails(book: Admin,userId:number): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/addBook/${userId}`, book);
  }

  getAllBooks(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseUrl}/getAllBooks`);
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteBook/${bookId}`, {
      responseType: 'text' as 'json',
    });
  }

  getBookDetailsById(bookId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/getBookById/${bookId}`);
  }

  updateBook(bookId: number, book: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/updateBook/${bookId}`, book);
  }

  getBooksCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/bookcount`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/getAllCategory`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/getAllOrder`);
  }

  getOrdersCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/orderCount`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    let params = new HttpParams().set('status', status);
    return this.http.put<Order>(
      `${this.baseUrl}/updateStatus/${orderId}`,
      null,
      { params }
    );
  }

  getAllBooksBySeller(sellerId: number): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.baseUrl}/seller/${sellerId}`);
  }

  getAllOrdersForSeller(sellerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/sellerOrders/${sellerId}`);
  }

  countBooksBySeller(userId:number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/countBookBySeller/${userId}`)
  }

  countOrdersBySeller(userId:number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/countOrderBySeller/${userId}`);
  }

  getSellerRevenue(sellerId: number, month: number, year: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/sellerRevenue/${sellerId}?month=${month}&year=${year}`);
  }
  
}
