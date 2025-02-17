import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../../service/adminservice.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-seller-revenue',
  templateUrl: './seller-revenue.component.html',
  styleUrl: './seller-revenue.component.css'
})
export class SellerRevenueComponent implements OnInit{

  // sellerId: number = 0; 
  revenue: number | null = null; 
  revenueForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  years: number[] = [];

  constructor(private revenueService: AdminserviceService, private fb: FormBuilder) {
    this.revenueForm = this.fb.group({
      month: [new Date().getMonth() + 1], 
      year: [new Date().getFullYear()] 
    });
  }
  
  ngOnInit(): void {
    this.generateYearOptions();
  }

  private generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear ; year++) {
      this.years.push(year);
    }
  }
  
  fetchRevenue(): void {
   const sellerId = Number(sessionStorage.getItem('userId'));
   const { month, year } = this.revenueForm.value;
    if (!sellerId || !month || !year) {
      this.errorMessage = 'Please select all required fields.';
      return;
    }
    console.log("seller idjhgdj",sellerId);
    console.log("seller year",year);
    console.log("seller month",month);
    
    this.revenueService.getSellerRevenue(sellerId, month, year).subscribe({
      next: (data) => {
        this.revenue = data;
        this.loading = false;
        this.errorMessage = ''; 
      },
      error: (err) => {
        this.revenue = null;
        this.errorMessage = 'Failed to fetch revenue. Please try again.';
        console.error(err);
      }
    });
  }

}
