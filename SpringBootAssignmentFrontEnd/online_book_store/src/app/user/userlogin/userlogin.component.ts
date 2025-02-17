import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { SessionStorageService } from '../../service/session-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css',
})
export class UserloginComponent {
  setRole(role: string) {
    localStorage.setItem('role', role);
  }
  submitted = false;
  errorMessage: string = '';
  user = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
      ),
    ]),
    userRole: new FormControl(),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  loginUsers() {
    this.submitted = true;
    console.log('Inside function');

    if (this.user.valid) {
      const userEmail: string = this.user.value.userEmail ?? '';
      const userPassword: string = this.user.value.userPassword ?? '';
      const userRole = localStorage.getItem('role');

      if (userEmail === 'admin@gmail.com' && userPassword === 'Admin@123') {
        this.router.navigate(['/superadmin']);
        return;
      }
      // if (userRole == 'SELLER') {
      //   this.router.navigate(['/dashboard']);
      //   return;
      // }

      const user: User = {
        userId: undefined,
        userName: '',
        userEmail,
        userContactNumber: '',
        userPassword,
        userAddress: '',
        userRole: '',
        blocked: false,
      };

      this.userService.loginUsers(user).subscribe(
        (response: User) => {
          console.log('response' + response);
          console.log('status' + response.blocked);

          if (response.blocked) {
            Swal.fire({
              icon: 'error',
              title: 'User Blocked',
              text: 'Your account has been blocked. Please contact admin@gmail.com for any queries.',
            });
            return;
          }

          const currentUser = {
            userId: response.userId,
            userName: response.userName,
            userEmail: response.userEmail,
            userContactNumber: response.userContactNumber,
          };

          const currentUserData = {
            userId: response.userId,
            userAddress: response.userAddress,
          };

          this.sessionStorageService.setItem(
            'userId',
            Number(currentUser.userId)
          );
          this.sessionStorageService.setItem(
            'userEmail',
            String(currentUser.userEmail)
          );
          this.sessionStorageService.setItem('isLoggedIn', 'true');
          if (response.userRole == 'SELLER') {
            this.router.navigate(['/dashboard']);
            return;
          }
          else{
          this.router.navigate(['/home']);
          }
        },
        (error: any) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid Email or Password.';
        }
      );
    }
  }
}
