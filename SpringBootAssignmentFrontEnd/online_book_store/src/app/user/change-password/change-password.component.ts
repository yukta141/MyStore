import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SessionStorageService } from '../../service/session-storage.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  email: string | null = null;
  submitted = false;
  user: FormGroup;

  constructor(
    private sessionStorage: SessionStorageService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.user = this.formBuilder.group({
      userEmail: [{ value: '', disabled: true }],
      userPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
        ),
      ]),
      userConfirmPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$'
        ),
      ]),
    });
  }

  ngOnInit(): void {
    this.email = this.sessionStorage.getItem('newUserEmail');
    if (!this.email) {
      console.log('User email found in session storage:', this.email);
      this.user.controls['userEmail'].setValue(this.email);
    } else {
      console.error('User email not found in session storage');
    }
  }

  setPassword(): void {
    this.submitted = true;
    if (this.user.valid) {
      const newPassword = this.user.get('userPassword')?.value;
      const confirmPassword = this.user.get('userConfirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match!',
        });
        return;
      }

      if (!this.email) {
        console.error('User email not found');
        return;
      }

      this.userService.setNewPassword(this.email, newPassword!).subscribe(
        (response) => {
          console.log('Password set successfully');
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password set successfully!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        },
        (error) => {
          console.error('Error setting password:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error setting password. Please try again later.',
          });
        }
      );

      this.user.reset();
      this.submitted = false;
    } else {
      console.log('Form is invalid');
    }
  }
}
