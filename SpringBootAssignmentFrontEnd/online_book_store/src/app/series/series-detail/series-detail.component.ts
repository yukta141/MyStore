import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { Subscription } from '../../model/subscription';
import { SubscriptionService } from '../../service/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent {
  // book: Book|undefined;
  // book: Book | undefined; 
  userId: number = Number(sessionStorage.getItem('userId'));
  book: Book = { bookId:0, bookName: '', bookAuthorName: '', bookDescription: '',bookCategory:'', bookPrice: 0, bookImage: '',bookSeries:'', relatedBooks: [] ,isWishlisted:false};
  relatedBooks: Book[] = []; 
  isSubscribed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService,
    private router:Router
  ) {}

  
  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookSeriesDetails(bookId).subscribe(data => {
      console.log('Fetched book series details:', data);  // Debugging statement
      this.book = data || this.book;
      this.checkSubscriptionStatus();
    });
    
  }
  

  subscribeToSeries(bookId: number) {
    const userId = Number(sessionStorage.getItem('userId'));
    if (!userId) {
      this.showLoginAlert();
      return;
    }
    console.log("useriddd", userId);
    
    const subscription: Subscription = { userId: userId, bookId: bookId };
    console.log('Subscription object:', subscription);
  
    this.subscriptionService.subscribeToSeries(subscription).subscribe(
      response => {
        console.log('Subscription successful:', response);
        this.checkSubscriptionStatus(); 
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully subscribed to the series.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Subscription failed:', error);  
        Swal.fire({
          title: 'Error!',
          text: 'Subscription failed. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }

  checkSubscriptionStatus(): void {
    if (this.userId && this.book.bookSeries) {
      this.subscriptionService.checkSubscription(this.userId, this.book.bookSeries).subscribe(
        isSubscribed => {
          this.isSubscribed = isSubscribed;
          console.log("status",isSubscribed);
          
        },
        error => {
          console.error('Error checking subscription status', error);
        }
      );
    }
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

}
