import { Component } from '@angular/core';
import { Notification } from '../../model/notification';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications: Notification[] = [];
  userId = Number(sessionStorage.getItem('userId'));

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));

    if (this.userId) {
      this.loadNotifications();
    } else {
      console.error('User ID is not available in session storage');
    }
  }

  loadNotifications(): void {
    this.notificationService.getUnseenNotifications(this.userId).subscribe(
      (data: Notification[]) => {
        this.notifications = data;
        console.log("Notifications:", data);
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  markAsSeen(notificationId: number): void {
    this.notificationService.markAsSeen(notificationId).subscribe(
      () => {
        setTimeout(() => {
          this.notifications = this.notifications.filter(
            (n) => n.notificationId !== notificationId
          );
        }, 10000); 
      },
      (error) => {
        console.error('Error marking notification as seen', error);
      }
    );
  }
  
  
}
