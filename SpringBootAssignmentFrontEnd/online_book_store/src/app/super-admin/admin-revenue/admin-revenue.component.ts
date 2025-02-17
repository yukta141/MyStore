import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-admin-revenue',
  templateUrl: './admin-revenue.component.html',
  styleUrl: './admin-revenue.component.css'
})
export class AdminRevenueComponent implements OnInit{

  revenue: number | null = null;
  revenueForm: FormGroup;
  loading: boolean = false;
  errorMessage: string | null = null;


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

  constructor(private revenueService: SuperAdminService, private fb: FormBuilder) {
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
    const { month, year } = this.revenueForm.value;

    if (!month || !year) {
      this.errorMessage = 'Please select a valid month and year.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.revenue = null;

    this.revenueService.getAdminRevenue(month, year).subscribe({
      next: (data: number) => {
        this.revenue = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch revenue. Please try again.';
        this.loading = false;
      }
    });
  }
}
