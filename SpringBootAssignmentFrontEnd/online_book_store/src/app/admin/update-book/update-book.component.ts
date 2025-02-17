import { Component } from '@angular/core';
import { Category } from '../../model/category';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../../service/adminservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../model/admin';
import Swal from 'sweetalert2';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent {
  submitted = false;
  productCategories: Category[] = [];
  private oldProductId: any = '';

  constructor(
    private route: ActivatedRoute,
    private service: AdminserviceService,
    private router: Router
  ) {
    this.updateProductFormCategories();
  }

  ngOnInit() {
    this.oldProductId = this.route.snapshot.params['bookId'];
    this.updateFormValues();
    this.updateProductFormCategories();
  }

  book = new FormGroup({
    bookName: new FormControl('', Validators.required),
    bookAuthorName: new FormControl('', Validators.required),
    bookDescription: new FormControl('', Validators.required),
    bookCategory: new FormControl('', Validators.required),
    bookPrice: new FormControl('', [Validators.required, Validators.min(100)]),

    bookImage: new FormControl('', Validators.required),
  });

  updateFormValues() {
    this.service.getBookDetailsById(this.oldProductId).subscribe((response) => {
      console.log(response);
      const bookPriceString = response.bookPrice.toString();

      this.book.patchValue({
        bookName: response.bookName,
        bookAuthorName: response.bookAuthorName,
        bookDescription: response.bookDescription,
        bookCategory: response.bookCategory,
        bookPrice: bookPriceString,
        bookImage: response.bookImage,
      });
    });
  }

  updateProduct = () => {
    this.submitted = true;
    if (this.book.valid) {
      const bookName = this.book.get('bookName')?.value ?? '';
      const bookAuthorName = this.book.get('bookAuthorName')?.value ?? '';
      const bookDescription = this.book.get('bookDescription')?.value ?? '';
      const bookCategory = this.book.get('bookCategory')?.value ?? '';
      const bookPrice = parseFloat(this.book.get('bookPrice')?.value ?? '0');

      const bookImage = this.extractFilename(
        this.book.get('bookImage')?.value ?? ''
      );
      const bookSeries = this.book.get('bookSeries')?.value ?? '';

      const updatedProduct = new Admin(
        bookName,
        bookAuthorName,
        bookDescription,
        bookCategory,
        bookPrice,
        bookImage,
        bookSeries
      );

      this.service.updateBook(this.oldProductId, updatedProduct).subscribe(
        () => {
          Swal.fire(
            'Success!',
            'Product updated successfully!',
            'success'
          ).then(() => {
            this.router.navigate(['/details']);
          });
        },
        () => {
          Swal.fire(
            'Error!',
            'There was an error adding the product.',
            'error'
          );
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
    this.service.getAllCategories().subscribe((categories: Category[]) => {
      this.productCategories = categories;
    });
  }
}
