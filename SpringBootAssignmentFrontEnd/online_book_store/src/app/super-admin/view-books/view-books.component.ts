import { Component } from '@angular/core';
import { Admin } from '../../model/admin';
import { AdminserviceService } from '../../service/adminservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css'
})
export class ViewBooksComponent {
  books: Admin[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(
    private productService: AdminserviceService,
    private router: Router
  ) {
    this.getAllBooks();
  }

  getAllBooks = () => {
    this.productService.getAllBooks().subscribe(
      (response) => {
        this.books = response.reverse();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  get paginatedProducts(): Admin[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.books.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  deleteBook(bookId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteBook(bookId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Book has been deleted.', 'success');
            this.getAllBooks();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the book.',
              'error'
            );
          }
        );
      }
    });
  }
}
