import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  registerUsers = (user: User): Observable<User> => {
    const userRole = localStorage.getItem('role');
    // console.log("role is"+ role);

    return this.http.post<User>(`${this.baseUrl}/register/${userRole}`, user);
  };

  loginUsers(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/userlogin`, user);
  }

  setNewPassword(email: string, newPassword: string): Observable<any> {
    const requestBody = new URLSearchParams();
    requestBody.set('userEmail', email);
    requestBody.set('newPassword', newPassword);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.put<any>(
      `${this.baseUrl}/setNewPassword`,
      requestBody.toString(),
      { headers }
    );
  }

  getUserProfileById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile/${userId}`);
  }

  updateUserDetails = (userId: number,user: User): Observable<User> => {
    return this.http.put<User>(`${this.baseUrl}/updateProfile/${userId}`,user);
  };
  
}
