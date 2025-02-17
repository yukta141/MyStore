import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../model/subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  subscribeToSeries(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/subscribe`, subscription);
  }

  checkSubscription(userId: number, bookSeries: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check`, {
      params: {
        userId: userId.toString(),
        bookSeries: bookSeries
      }
    });
  }

  getUserSubscribedSeries(userId:number):Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/subscribed/${userId}`);
  }

}
