import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrl: './userregister.component.css',
})
export class UserregisterComponent {
  emailExistsErrorMessage: string = '';
  submitted = false;

  constructor(private service: UserService, private router: Router) {}

  user = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', 
    [Validators.required, 
      Validators.email,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),

    userContactNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]+'),
    ]),
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
    userAddress: new FormControl('', [Validators.required]),
    userRole: new FormControl(''),
  });

  registerUsers = () => {
    this.submitted = true;

    const role=localStorage.getItem('role');
    console.log(role);
    
    if (this.user.valid) {
      const password = this.user.value.userPassword;
      const confirmPassword = this.user.value.userConfirmPassword;

      if (password !== confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Passwords Do Not Match',
          text: 'Please make sure the passwords match.',
        });
        return;
      }

      const user = new User(
        this.user.value.userName!,
        this.user.value.userEmail!,
        this.user.value.userContactNumber!,
        this.user.value.userPassword!,
        this.user.value.userAddress!,
        this.user.value.userRole!
      );

      this.service.registerUsers(user).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: 'You have successfully registered!',
          }).then(() => {
            this.router.navigate(['user/login']);
          });
        },
        (error) => {
          if (error.status === 409 && error.error && error.error.errorMessage) {
            this.emailExistsErrorMessage = error.error.errorMessage;
          } else {
          }
        }
      );
    }
  };
}
