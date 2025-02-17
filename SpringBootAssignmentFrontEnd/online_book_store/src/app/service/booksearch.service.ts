import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../model/book';

@Injectable({
  providedIn: 'root'
})
export class BooksearchService {

  private baseUrl = 'http://localhost:8080';
  private searchQuerySubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient) { }

  searchBooks(bookName: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/search/${bookName}`);
   }
}
