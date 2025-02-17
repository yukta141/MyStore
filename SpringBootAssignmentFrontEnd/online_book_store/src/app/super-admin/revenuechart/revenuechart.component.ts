import { Component, OnInit } from '@angular/core';

import { Revenue } from '../../model/revenue';
import { SuperAdminService } from '../../service/super-admin.service';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-revenuechart',
  templateUrl: './revenuechart.component.html',
  styleUrl: './revenuechart.component.css'
})
export class RevenuechartComponent implements OnInit {

  chart: any;

  constructor(private revenueService: SuperAdminService) { }

  ngOnInit(): void {
    this.getMonthlyRevenue();
  }

  getMonthlyRevenue() {
    this.revenueService.getMonthlyRevenue().subscribe((data: Revenue[]) => {
      const months = data.map(item => {
        const date = new Date(item.month);
        return date.toISOString().substring(0, 7); 
      });
      const revenues = data.map(item => item.revenue);

      this.createChart(months, revenues);
    });
  }

  createChart(months: string[], revenues: number[]) {
    const ctx = (document.getElementById('monthlyRevenueChart') as HTMLCanvasElement).getContext('2d');
  
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line', 
        data: {
          labels: months, 
          datasets: [{
            label: 'Monthly Revenue',
            data: revenues,
            backgroundColor: 'rgba(83, 79, 172, 0.2)',
            borderColor: '#534FAC', 
            borderWidth: 2, 
            tension: 0.4, 
            pointBackgroundColor: '#534FAC', 
            pointBorderColor: '#ffffff', 
            pointRadius: 5 
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top' 
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Months'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Revenue (in ₹)'
              }
            }
          }
        }
      });
    } else {
      console.error("Canvas context is null. Chart cannot be created.");
    }
  }
  
}
