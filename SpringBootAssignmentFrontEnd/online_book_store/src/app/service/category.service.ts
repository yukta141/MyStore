import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book';
import { url } from 'inspector';
import { CategorySales } from '../model/category-sales';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080';

  totalCategories!: number;
  categories: Category[] = [];
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/addCategory`, category);
  }

  getCategoryDetails(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/getAllCategory`);
  }

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCategory/${categoryId}`, {
      responseType: 'text',
    });
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get<Category>(
      `${this.baseUrl}/getCategoryById/${categoryId}`
    );
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.baseUrl}/updateCategory/${categoryId}`,
      category
    );
  }

  getCategoriesCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/categoryCount`);
  }

  getTopSellingCategories(): Observable<CategorySales[]> {
    return this.http.get<CategorySales[]>(`${this.baseUrl}/topSale-categories`);
  }
}
