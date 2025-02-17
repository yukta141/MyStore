import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  isEmailDisabled: boolean = true;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService){}

    private oldUserId: any = '';
  ngOnInit() {
    this.oldUserId = this.route.snapshot.paramMap.get('userId');
    this.updateFormValues();
  }

  user = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
    ]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userContactNumber: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+')]),
    userAddress: new FormControl(''),
    userCity: new FormControl(''),
    userState: new FormControl(''),
    userPinCode: new FormControl(''),
  });

  updateFormValues() {
    this.userService
      .getUserProfileById(this.oldUserId)
      .subscribe((response: User) => {
        this.user.patchValue({
          userName: response.userName,
          userEmail: response.userEmail,
          userContactNumber: response.userContactNumber,
        });
      });
  }

  updateUserDetails = () => {
    const newUser = new User(
      this.user.value.userName!,
      this.user.value.userEmail!,
      this.user.value.userContactNumber!,
      '',
      this.user.value.userAddress!,
      this.user.value.userCity!
     
    );

    this.userService
      .updateUserDetails(this.oldUserId, newUser)
      .subscribe((response) => {
       
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully!',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['user/profile']);
          }
        });
      });
  }
}
