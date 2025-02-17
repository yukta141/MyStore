import { Component } from '@angular/core';
import { Category } from '../../model/category';
import { AdminserviceService } from '../../service/adminservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../model/admin';
import Swal from 'sweetalert2';
import { NotificationService } from '../../service/notification.service';
import { response } from 'express';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  submitted = false;
  bookCategories: Category[] = [];
  showSeriesField=false;

  constructor(
    private productService: AdminserviceService,
    private notificationService:NotificationService,
    private router: Router
  ) {
    this.updateProductFormCategories();
  }

  ngOnInit(): void {
    this.updateProductFormCategories();
  }

  book = new FormGroup({
    bookName: new FormControl('', Validators.required),
    bookAuthorName: new FormControl('', Validators.required),
    bookDescription: new FormControl('', Validators.required),
    bookCategory: new FormControl('', Validators.required),
    bookPrice: new FormControl('', [Validators.required, Validators.min(100)]),
    bookImage: new FormControl('', Validators.required),
    bookSeries: new FormControl('')
    
  });

  addBookDetails = () => {
    this.submitted = true;
    if (this.book.valid) {
      console.log('Form submitted:', this.book.value);
      const bookData = this.book.value;

      const book = new Admin(
        bookData.bookName ?? '',
        bookData.bookAuthorName ?? '',
        bookData.bookDescription ?? '',
        bookData.bookCategory ?? '', 
        +(bookData.bookPrice ?? 0),
        this.extractFilename(bookData.bookImage ?? ''),
        bookData.bookSeries ?? '',
      );

      const userId = Number(sessionStorage.getItem('userId'));
      this.productService.addProductDetails(book,userId).subscribe(
        (response:any) => {
          console.log("book added data",response);
          
          const bookId= response.bookId;
          this.onBookAdded(bookId);
          Swal.fire('Success!', 'Book has been added!', 'success').then(() => {
            this.router.navigate(['details']);
          });
        },
        () => {
          Swal.fire('Error!', 'There was an error adding the book.', 'error');
        }
      );
    } else {
      this.book.markAllAsTouched();
    }
  };

  extractFilename(fullPath: string): string {
    const parts = fullPath.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  updateProductFormCategories() {
    this.productService
      .getAllCategories()
      .subscribe((categories: Category[]) => {
        this.bookCategories = categories;
      });
  }

  // createNotification(): void {
  //   const userId = Number(sessionStorage.getItem('userId'));
  //   const bookId = 32; 

  //   this.notificationService.createNotification(userId, bookId).subscribe(
  //     response => {
  //       console.log('Notification created:', response);
        
  //     },
  //     error => {
  //       console.error('Error creating notification:', error);
        
  //     }
  //   );
  // }

  onBookAdded(bookId: number): void {
    const userId = Number(sessionStorage.getItem('userId'));
    if (isNaN(userId) || !userId || !bookId) {
      console.error('Invalid userId or bookId');
      return;
    }

    this.notificationService.createNotificationForNewBook(bookId).subscribe(
      () => {
        console.log('Notification created successfully');
      },
      (error) => {
        // console.error('Error creating notification', error);
        // Swal.fire('Error!', 'There was an error creating the notification.', 'error');
      }
    );
  }

}
