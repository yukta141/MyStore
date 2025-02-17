import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../model/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  addFeedback(feedback: Feedback,userId:number): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/addFeedback/${userId}`, feedback);
  }

  getAllFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/getAllFeedbacks`)
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deletefeedback/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
