import { Component, OnInit } from '@angular/core';
import { Book } from '../../model/book';
import { ActivatedRoute } from '@angular/router';
import { BooksearchService } from '../../service/booksearch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  books: Book[] = [];
  searchQuery!: string;

  constructor(
    private route: ActivatedRoute,
    private bookService: BooksearchService
  ) {}
  onSearchInputChange(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.searchQuery = params['query'];
      this.searchBooks();
    });
  }

  searchBooks(): void {
    if (this.searchQuery.trim() !== '') {
      this.bookService.searchBooks(this.searchQuery).subscribe(
        (data: Book[]) => {
          this.books = data;
          console.log(data);
        },
        (error: any) => {
          console.error('Error fetching books:', error);
        }
      );
    } else {
      console.log('No Books');
    }
  }
}
