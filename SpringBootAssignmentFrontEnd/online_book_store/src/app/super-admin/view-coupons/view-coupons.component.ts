import { Component } from '@angular/core';
import { Coupon } from '../../model/coupon';
import { CouponService } from '../../service/coupon.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-coupons',
  templateUrl: './view-coupons.component.html',
  styleUrl: './view-coupons.component.css'
})
export class ViewCouponsComponent {
  coupons: Coupon[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private couponService: CouponService, private router: Router) {
    this.getAllCoupons();
  }

  getAllCoupons = () => {
    this.couponService.getCoupons().subscribe(
      (response) => {
        const currentDate = new Date();
        this.coupons = response
        .filter(coupon => new Date(coupon.couponExpirationDate) >= currentDate)
        .reverse();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  get paginatedCoupons(): Coupon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.coupons.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.coupons.length / this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  deleteCoupon(couponId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this coupon?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.couponService.deleteCoupon(couponId).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Coupon has been deleted.', 'success');
            this.getAllCoupons();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the coupon.',
              'error'
            );
          }
        );
      }
    });
  }
}
