import { Component, OnInit } from '@angular/core';
import { Category } from './model/category';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'online_book_store';

  bookName: string = '';

  categories: Category[] = [];
  constructor(private service: CategoryService) {}

  ngOnInit() {
    this.service.getCategoryDetails().subscribe((response) => {
      console.log(response);
      this.categories = response;
    });
  }

  logout(): void {
    sessionStorage.clear();
  }
}
