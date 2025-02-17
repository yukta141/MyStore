import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-nav',
  templateUrl: './super-admin-nav.component.html',
  styleUrl: './super-admin-nav.component.css',
})
export class SuperAdminNavComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.router.navigate(['user/home']);
  }
}
