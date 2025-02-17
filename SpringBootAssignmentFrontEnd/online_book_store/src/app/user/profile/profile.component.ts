import { Component } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { SessionStorageService } from '../../service/session-storage.service';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../service/subscription.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: User=new User("","","","","","",);
  getUserDetailsById: any;
  userId! :number;
  subscribedSeries: string[] = [];
  error: string | null = null;

  constructor(
    private userService: UserService,
    private subscriptionService:SubscriptionService,
    private sessionStorage: SessionStorageService, private router: Router
) {}

ngOnInit(): void {
  this.userId = Number(sessionStorage.getItem('userId'));  

  if (this.userId) {
    this.getUserProfileById(this.userId);
  } else {
    console.error("No valid user ID found in session storage.");
  }
  if (this.userId) {
    this.loadSubscribedSeries();
  } else {
    this.error = 'User ID not found';
  }
}

getUserProfileById(userId: number): void {
  this.userService.getUserProfileById(userId).subscribe(
    (user: User) => {
      this.user = user;
      console.log("User details fetched:", user);
    },
    (error) => {
      console.error('Error fetching user details:', error);
    }
  );
}

getUserSubscribedSeries(userId: number): void {
  this.subscriptionService.getUserSubscribedSeries(userId).subscribe(
    (series: string[]) => {
      this.subscribedSeries = series;
      console.log("subscribed series are",series);
      
    },
    (error) => {
      console.error('Error fetching subscribed series:', error);
    }
  );
}

loadSubscribedSeries(): void {
  this.subscriptionService.getUserSubscribedSeries(this.userId).subscribe(
    (series) => {
      this.subscribedSeries = series;
    },
    (error) => {
      this.error = 'Error fetching subscribed series';
      console.error('Error fetching subscribed series:', error);
    }
  );
}
  
}
