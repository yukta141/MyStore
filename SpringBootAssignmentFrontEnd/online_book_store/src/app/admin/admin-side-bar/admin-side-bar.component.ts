import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../service/session-storage.service';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css',
})
export class AdminSideBarComponent {
  isLoggedIn = false;

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService
  ) {}

  logout(): void {
    this.sessionStorage.setItem('isLoggedIn', 'false');
    this.sessionStorage.clearItems();
    this.isLoggedIn = false;
    this.router.navigate(['user/home']);
  }
}
