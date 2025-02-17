import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../service/wishlist.service';
import { Book } from '../../model/book';
import Swal from 'sweetalert2';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  wishlistedBooks: Book[] = [];
  userId: number = 0;
  bookId!:number;
  productDetails!: Book;
  quantity: number =1;
  totalPrice!:number;
  
  constructor(private wishlistService: WishlistService,private cartService:CartService,private router:Router) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    if (this.userId) {
      this.loadWishlistedBooks();
    }
  }

  loadWishlistedBooks(): void {
    this.wishlistService.getWishlist(this.userId).subscribe(
      (response: any) => {
        console.log('Fetched wishlisted books:', response);
        if (response && Array.isArray(response.books)) {
          this.wishlistedBooks = response.books;
        } else {
          console.error('Fetched data is not an array:', response);
        }
      },
      (error) => {
        console.error('Error fetching wishlisted books', error);
      }
    );
  }

  // loadWishlistedBooks(): void {
  //   this.wishlistService.getWishlist(this.userId).subscribe(
  //     (response: any) => {
  //       console.log('Fetched wishlisted books:', response);
  //       if (response && Array.isArray(response.books)) {
  //         this.wishlistedBooks = response.books.map(book => {
  //           book.isWishlisted = true; // Set isWishlisted to true for fetched books
  //           return book;
  //         });
  //       } else {
  //         console.error('Fetched data is not an array:', response);
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching wishlisted books', error);
  //     }
  //   );
  // }

  removeFromWishlist(bookId: number) {
    this.wishlistService.removeBookFromWishlist(this.userId, bookId).subscribe(
      
      response => {
        console.log('Book removed from wishlist', response);
        console.log("book id wishlist",bookId);
        console.log("user id wishlist",this.userId);
        
        this.loadWishlistedBooks(); 
      },
      error => {
        console.error('Error removing book from wishlist', error);
      }
    );
  }

  addToCart(book: Book): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    console.log("user cart", this.userId);
  
    if (this.userId && book) {
      this.productDetails = book; // Assign the passed book object to productDetails
      const bookId = this.productDetails.bookId;
      console.log("cart user produ", this.productDetails);
  
      if (bookId === undefined) {
        Swal.fire('Error', 'Product ID is missing', 'error');
        return;
      }
  
      const cartItem = {
        bookId: bookId,
        quantity: this.quantity,
      };
  
      const cartItems = [cartItem];
      this.totalPrice = this.productDetails.bookPrice * this.quantity;
      console.log('cartItems', cartItem);
  
      this.cartService.addItemToCart(this.userId, cartItems).subscribe(
        (response) => {
          console.log("response", response);
          Swal.fire('Success', 'Item added to cart', 'success');
          this.router.navigate(['/getcart/', this.userId]);
        },
        (error) => {
          console.error('Error adding item to cart:', error);
          Swal.fire('Error', 'Failed to add item to cart', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'User not logged in or product details missing', 'error');
    }
  }
  

}
