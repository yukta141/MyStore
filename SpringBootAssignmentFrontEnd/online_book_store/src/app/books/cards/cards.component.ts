import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { WishlistService } from '../../service/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  books: Book[] = [];
  category: string = '';
  userId: number = 0;
  bookId!:number;

  constructor(
    private route: ActivatedRoute,
    private bookcardsservice: BookService,
    private wishlistService:WishlistService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.getProductsByCategory(this.category);
    });
  }

  getProductsByCategory(category: string): void {
    console.log('Category:', category);
    this.bookcardsservice.getCustomerDetails(category).subscribe(
      (products) => {
        console.log('Products:', products);
        this.books = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  
  addToWishlist(bookId: number, product: any): void {
    this.userId = Number(sessionStorage.getItem('userId'));
  
    
    if (!this.userId) {
      Swal.fire({
        title: 'Not Logged In!',
        text: 'Please log in to add books to your wishlist.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.router.navigate(['/user/login']);
        }
      });
      return; 
    }
  
    this.wishlistService.addBookToWishlist(this.userId, bookId).subscribe(
      (response) => {
        console.log('Book added to wishlist', response);
        product.isWishlisted = true;
        Swal.fire({
          title: 'Added to Wishlist!',
          text: product.bookName + ' has been added to your wishlist.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Error adding book to wishlist', error);
  
        Swal.fire({
          title: 'Error!',
          text: 'Book is already in the wishlist.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  

  private updateWishlistState(): void {
    this.books.forEach(book => {
      book.isWishlisted = book.isWishlisted || false; 
    });
  }
}
