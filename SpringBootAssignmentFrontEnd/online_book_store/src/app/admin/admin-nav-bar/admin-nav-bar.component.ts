import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrl: './admin-nav-bar.component.css',
})
export class AdminNavBarComponent {
  isLoggedIn = false;
  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['user/home']);
  }
}
