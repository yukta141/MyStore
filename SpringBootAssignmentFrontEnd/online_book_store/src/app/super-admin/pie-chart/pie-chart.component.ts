import { Component, OnInit } from '@angular/core';

import {Chart} from 'chart.js';
import { SuperAdminService } from '../../service/super-admin.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent implements OnInit {

  chart: any;

  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadDataForPieChart();
  }

  loadDataForPieChart(): void {
    this.superAdminService.getOrdersBySeller().subscribe(
      (data) => {
        const sellerNames = data.map((item) => item.sellerName);
        const orderCounts = data.map((item) => item.orderCount); // order counts

        this.createPieChart(sellerNames, orderCounts);
      },
      (error) => {
        console.error('Error fetching orders by seller:', error);
      }
    );
  }

  createPieChart(labels: string[], dataValues: number[]): void {
    const ctx = (document.getElementById('pieChart') as HTMLCanvasElement).getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Orders by Seller',
              data: dataValues,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const value = tooltipItem.raw;
                  return `Orders: ${value}`;
                },
              },
            },
          },
        },
      });
    } else {
      console.error("Canvas context is null. Chart cannot be created.");
    }
  }
  
}
