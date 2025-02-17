import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor() { }

  login() {
    this.loggedIn = true; // Here you can add your logic for logging in
  }

  logout() {
    this.loggedIn = false; // Here you can add your logic for logging out
  }

  isAuthenticated(): boolean {
    return this.loggedIn; // Check if user is logged in
  }
}
