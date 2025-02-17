import { Component } from '@angular/core';
import { Book } from '../../model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import Swal from 'sweetalert2';
import { Order } from '../../model/order';
import { environment } from '../../../environments/environment';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../model/cart';
import { CartItem } from '../../model/cart-item';

declare let Razorpay: any;

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css',
})
export class CardDetailsComponent {
  bookId!: number;
  productDetails!: Book;
  userId!: number;
  user!: User;
  razorpay: any;
  bookPrice: number | undefined;
  quantity: number =1;
  totalPrice!:number;
  book!: Book;

  constructor(
    private route: ActivatedRoute,
    private productcardsservice: BookService,
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = +params['id'];
      this.loadProductDetails();
    });
    this.userId = Number(sessionStorage.getItem('userId'));
    console.log('User ID:', this.userId);
  }

  addToCart(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    console.log("user cart",this.userId);
    
    if (this.userId && this.productDetails) 
    
    {
      const bookId= this.productDetails.bookId;
    console.log("cart user produ",this.productDetails);

      if (bookId === undefined) {
        Swal.fire('Error', 'Product ID is missing', 'error');
        return;
      }
     const cartItem= {
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
  

  loadProductDetails(): void {
    this.productcardsservice.getProductDetails(this.bookId).subscribe(
      (data: Book) => {
        this.productDetails = data;
        console.log('book id is:' + this.bookId);
      },
      (error) => {
        console.log('Error fetching product details:', error);
      }
    );
  }

  showLoginAlert(): void {
    Swal.fire({
      title: 'Please login first',
      text: 'You need to login before adding items to your cart.',
      icon: 'warning',
      confirmButtonText: 'Login',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/user/login']);
      }
    });
  }

  buyNow(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to buy this product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, buy it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Redirecting...',
          text: 'You are being redirected to the payment gateway.',
          icon: 'info',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.initializeRazorpay();
          this.razorpay.open();
        });
      }
    });
  }

 
  initializeRazorpay(): void {
    this.bookPrice = this.productDetails?.bookPrice;

    this.razorpay = new Razorpay({
      key: environment.RAZORPAY_KEY,

      amount: this.bookPrice * 100,
      currency: 'INR',
      name: 'My Store',
      description: 'Test Transaction',
      image: '/assets/image/mystore.jfif',
      handler: (response: any) => {
        // this.submitOrder();
        this.router.navigate(['/home']);
      },
      prefill: {
        name: 'Yukta Patil',
        email: 'yuktapatil@gmail.com',
        contact: '8788281575',
      },
      notes: {
        address: 'Customer Address',
      },
      theme: {
        color: '#6a11cb',
      },
    });
  }


  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
}
