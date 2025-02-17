import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notification } from '../model/notification';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient ) { }

  createNotificationForNewBook(bookId: number): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/createNotifications`, bookId);
}

  getUnseenNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/getNotify?userId=${userId}`);
}

markAsSeen(notificationId: number): Observable<Notification> {
  return this.http.patch<Notification>(`${this.baseUrl}/mark-as-seen/${notificationId}`,{});
}


}
