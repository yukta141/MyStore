import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../model/wishlist';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}
  

  addBookToWishlist(userId: number, bookId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/addBookToWishlist?userId=${userId}&bookId=${bookId}`,{});
  }

  getWishlist(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/getUsersWishlist/${userId}`);
  }

  removeBookFromWishlist(userId: number, bookId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/removeFromWishlist?userId=${userId}&bookId=${bookId}`);
  }

 
}
