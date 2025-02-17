import { Component } from '@angular/core';
import { Coupon } from '../../model/coupon';
import { CouponService } from '../../service/coupon.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-coupons',
  templateUrl: './add-coupons.component.html',
  styleUrl: './add-coupons.component.css'
})
export class AddCouponsComponent {
  coupons: Coupon[] = [];
  newCoupon: Coupon = new Coupon('', '', 0,'', '','',''); 
  successMessage: string = '';
  errorMessage: string = '';
  submitted = false;
  currentDate: string;

  constructor(private couponService:CouponService, private router:Router){
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
  }

  coupon = new FormGroup({
    couponName: new FormControl('', Validators.required),
    couponCode: new FormControl('', Validators.required),
    couponDiscount: new FormControl('', [Validators.required,Validators.min(1)]),
    couponDescription: new FormControl('', Validators.required),
    couponExpirationDate: new FormControl('', Validators.required),
    conditionType: new FormControl(''),
    conditionValue: new FormControl('')
    
  });


  addCouponDetails = () => {
    this.submitted = true;
    if (this.coupon.valid) {
      console.log('Form submitted:', this.coupon.value);
      const coupons = this.coupon.value;

      const coupon = new Coupon(
        coupons.couponName ?? '',
        coupons.couponCode ?? '',
        +(coupons.couponDiscount ?? 0),
        coupons.couponDescription ?? '',
        coupons.couponExpirationDate ?? '', 
        coupons.conditionType ?? '',
        coupons.conditionValue ?? '' 
      );

      this.couponService.addCoupon(coupon).subscribe(
        (response:any) => {
          console.log("hasdguyahs");
          
          console.log("coupon added data",response);

          const couponId= response.couponId;
          // this.onBookAdded(bookId);
          Swal.fire('Success!', 'Coupon has been added!', 'success').then(() => {
            this.router.navigate(['viewcoupons']);
            this.coupon.reset();
            this.submitted = false; 
          });
        },
        () => {
          Swal.fire('Error!', 'There was an error adding the coupon.', 'error');
        }
      );
    } else {
      console.log("not working");
      
      // this.book.markAllAsTouched();
    }
  };
    }


