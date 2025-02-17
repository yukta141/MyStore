import { Component } from '@angular/core';
import { Category } from '../../model/category';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksearchService } from '../../service/booksearch.service';
import { SessionStorageService } from '../../service/session-storage.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  categories: Category[] = [];
  email: string | null = null;
  name: string | null = null;
  userId?: string | null;
  searchQuery: string = '';
  books: Book[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BooksearchService,
    private sessionStorageService: SessionStorageService,
    private service: CategoryService
  ) {
    this.userId = sessionStorage.getItem('userId');
  }

  onSearchInputChange(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    // this.email = sessionStorage.getItem('email');
    this.isLoggedIn = this.sessionStorageService.getItem('isLoggedIn');
    this.name = sessionStorage.getItem('name');
    // this.isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));
    console.log('Is logged in:', this.isLoggedIn);
    this.service.getCategoryDetails().subscribe((response) => {
      console.log(response);
      this.categories = response;
    });
  }

  searchProducts(): void {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search', this.searchQuery]);
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['user/home']);
  }

  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  navigateToCart() {
    if (this.userId) {
      this.router.navigate(['getcart', this.userId]);
    } else {
    }
  }
}
