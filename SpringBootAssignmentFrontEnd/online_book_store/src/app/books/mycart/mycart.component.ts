import { Component } from '@angular/core';
import { CartItem } from '../../model/cart-item';
import { CartService } from '../../service/cart.service';
import Swal from 'sweetalert2';
import { Cart } from '../../model/cart';
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user';
import { Order } from '../../model/order';
import { Book } from '../../model/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Coupon } from '../../model/coupon';
import { CouponService } from '../../service/coupon.service';

declare let Razorpay: any;
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrl: './mycart.component.css',
})
export class MycartComponent {
  userId!: number;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  cart: Cart | null = null;
  razorpay: any;
  user!: User;
  bookPrice: number | undefined;
  couponForm: FormGroup;
  isCouponApplied: boolean = false;
  appliedCoupon: Coupon | null | undefined = null;
  coupons: Coupon[] = [];

  constructor(
    private cartService: CartService,
    private productcardsservice: BookService,
    private router: Router,
    private fb: FormBuilder,
    private couponService: CouponService
  ) {
    this.couponForm = this.fb.group({
      couponCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const userId = Number(sessionStorage.getItem('userId'));
    this.loadCart(userId);
  }

  loadCart(userId: number): void {
    this.cartService.getCart(userId).subscribe(
      (cart: Cart) => {
        console.log('Cart:', cart);
        this.userId = cart.userId;
        this.cartItems = cart.items;
        this.totalPrice = cart.totalPrice;
        this.isCouponApplied = !!cart.coupon;
        // this.isCouponApplied = cart.coupon !== null;
        // this.isCouponApplied = cart.couponId !== null;
        this.appliedCoupon = cart.coupon;
        console.log('coupon present', this.isCouponApplied);
        this.getAllCoupons();

        console.log('Cart Items:', this.cartItems);
        this.cartItems.forEach((item) =>
          console.log('Book Name:', item.book.bookName)
        );
      },
      (error) => {
        console.error('Error loading cart:', error);
      }
    );
  }

  removeCartItem(index: number): void {
    const cartItem = this.cartItems[index];
    if (!cartItem || cartItem.id === undefined) {
      console.error('Invalid cart item or cartId at index:', index);
      return;
    }

    const cartIdToRemove = cartItem.id;
    const userId = Number(sessionStorage.getItem('userId'));
    this.cartService.removeItemFromCart(userId, cartIdToRemove).subscribe(
      () => {
        console.log('Item removed from cart successfully');
        this.cartItems.splice(index, 1);
        this.calculateTotalPrice();
        // this.router.navigate(["/feedback"]);
      },
      (error) => {
        console.error('Failed to remove item from cart', error);
      }
    );
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

  submitOrder(): void {
    const userId = Number(sessionStorage.getItem('userId'));

    if (userId && this.cartItems.length > 0) {
      const orderList: Order[] = [];
      let grpId = '';

      for (let i = 0; i < 5; i++) {
        const randomNumber = this.getRandomInt(1, 9);
        grpId += randomNumber;
      }

      for (const cartItem of this.cartItems) {
        console.log('Cart Item:', cartItem);
        const order = new Order(
          cartItem.book,
          cartItem.book.bookId!,
          // cartItem.quantity,
          userId,
          parseInt(grpId),
          cartItem.user,
          'PLACED',
          new Date(),
          this.calculateEstimatedDeliveryDate()
        );
        console.log('Order Created:', order);
        orderList.push(order);
      }

      console.log('Order List:', orderList);

      this.productcardsservice.submitOrder(orderList, userId).subscribe(
        (response) => {
          console.log('Order Response:', response);
          console.log('Order submitted successfully');
          this.removeCartItemsAfterOrder(userId);
          // this.router.navigate(['/success']);
        },
        (error) => {
          console.error('Failed to submit order:', error);
          console.error('Error Details:', JSON.stringify(error, null, 2));
        }
      );
    } else {
      console.error('User ID or cart items are undefined');
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((accumulatedPrice, currentItem) => {
      return (
        accumulatedPrice + currentItem.book.bookPrice * currentItem.quantity
      );
    }, 0);
  }

  removeCartItemsAfterOrder(userId: number): void {
    this.cartService.removeAllCartItemsForUser(userId).subscribe(
      () => {
        console.log('Cart items removed successfully after placing order.');
        this.router.navigate(['/feedback']);
      },
      (error) => {
        console.error('Error occurred while removing cart items:', error);
      }
    );
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  initializeRazorpay(): void {
    const amount = Math.round(this.totalPrice * 100);
    this.razorpay = new Razorpay({
      key: environment.RAZORPAY_KEY,
      amount: amount,
      currency: 'INR',
      name: 'My Store',
      description: 'Test Transaction',
      image: '/assets/image/mystore.jfif',
      handler: (response: any) => {
        this.submitOrder();
        // this.router.navigate(['/home']);
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

  calculateEstimatedDeliveryDate(): Date {
    const today = new Date();
    const estimatedDeliveryDate = new Date();
    estimatedDeliveryDate.setDate(today.getDate() + 5);
    return estimatedDeliveryDate;
  }

  applyCoupon() {
    const couponCode = this.couponForm.get('couponCode')?.value;
    if (!couponCode) {
      Swal.fire('Error!', 'Coupon code cannot be empty.', 'error');
      return;
    }

    if (this.isCouponApplied) {
      Swal.fire('Error!', 'YOU HAVE ALREADY APPLIED THE COUPON.', 'error');
      return;
    }

    this.cartService.applyCoupon(couponCode).subscribe(
      (response) => {
        Swal.fire('Success!', 'Coupon applied successfully!', 'success');
        if (response && response.totalPrice) {
          this.totalPrice = response.totalPrice;
          this.isCouponApplied = true;
        }
        this.loadCart(this.userId);
      },
      (error) => {
        Swal.fire('Error!', 'ENTER VALID COUPON CODE.', 'error');
      }
    );
  }

  // applyCoupon() {
  //   const couponCode = this.couponForm.get('couponCode')?.value;
  //   if (!couponCode) {
  //     Swal.fire('Error!', 'Coupon code cannot be empty.', 'error');
  //     return;
  //   }

  //   this.cartService.applyCoupon(couponCode).subscribe(
  //     response => {
  //       Swal.fire('Success!', 'Coupon applied successfully!', 'success');

  //       if (response && response.totalPrice) {
  //         this.totalPrice = response.totalPrice;  // Update total price
  //       }
  //       this.loadCart(this.userId);
  //     },
  //     error => {
  //       Swal.fire('Error!', error?.message || 'Error applying coupon.', 'error');
  //     }
  //   );
  // }

  removeCoupon() {
    const userId = Number(sessionStorage.getItem('userId'));
    this.cartService.removeCoupon(userId).subscribe(
      (response) => {
        this.totalPrice = response.totalPrice;
        this.isCouponApplied = false;
        Swal.fire('Success!', 'Coupon removed successfully!', 'success');
      },
      (error) => {
        Swal.fire(
          'Error!',
          error?.message || 'Error removing coupon.',
          'error'
        );
      }
    );
  }

  // getAllCoupons = () => {
  //   this.couponService.getCoupons().subscribe(
  //     (response) => {
  //       this.coupons = response.reverse();
  //       console.log('Coupons fetched:', this.coupons);
  //     },
  //     (error) => {
  //       console.log('Error fetching coupons:', error);
  //     }
  //   );
  // };

  getAllCoupons = () => {
    this.couponService.getCoupons().subscribe(
      (response) => {
        const currentDate = new Date();
        this.coupons = response
          .filter(
            (coupon: any) => new Date(coupon.couponExpirationDate) > currentDate
          )
          .reverse();
        console.log('Available coupons:', this.coupons); // Check if coupons are logged
      },
      (error) => {
        console.log('Error fetching coupons:', error);
      }
    );
  };
}
