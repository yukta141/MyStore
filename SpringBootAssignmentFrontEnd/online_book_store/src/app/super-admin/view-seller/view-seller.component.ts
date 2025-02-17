import { Component, ElementRef, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { SuperAdminService } from '../../service/super-admin.service';
import { CategoryService } from '../../service/category.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-plugin-annotation';
import { CategorySales } from '../../model/category-sales';
import { AdminUsersService } from '../../service/admin-users.service';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-view-seller',
  templateUrl: './view-seller.component.html',
  styleUrl: './view-seller.component.css',
})
export class ViewSellerComponent implements OnInit {
  user: User[] = [];
  totalCategories: number | undefined;
  totalBooks: number | undefined;
  totalUsers: number | undefined;
  totalOrders: number | undefined;
  private chart: Chart | undefined;

  constructor(private superAdminService: SuperAdminService,private categoryService: CategoryService,private el: ElementRef,
    private bookService: AdminserviceService,
    private userService: AdminUsersService) 
  {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  
    this.fetchTopSellingCategories();
    this.loadCategoriesCount();
    this.loadProductsCount();
    this.loadUsersCount();
    this.loadOrdersCount();
  
  }
   
  fetchTopSellingCategories(): void {
    this.categoryService.getTopSellingCategories()
      .subscribe(data => {
        this.createChart(data);
      });
  }

  
  loadCategoriesCount() {
    this.categoryService.getCategoriesCount().subscribe(
      (count) => {
        this.totalCategories = count;
       
      },
      (error) => {
        console.error('Error fetching categories count:', error);
      }
    );
  }
 

  loadProductsCount() {
    this.bookService.getBooksCount().subscribe(
      (count) => {
        this.totalBooks = count;
       
      },
      (error) => {
        console.error('Error fetching products count:', error);
      }
    );
  }

  loadUsersCount() {
    this.userService.getSellerCount().subscribe(
      (count) => {
        this.totalUsers = count;
        
      },
      (error) => {
        console.error('Error fetching users count:', error);
      }
    );
  }

  loadOrdersCount() {
    this.bookService.getOrdersCount().subscribe(
      (count) => {
        this.totalOrders = count;
        console.log('count is' + this.totalOrders);

        
      },
      (error) => {
        console.error('Error fetching orders count:', error);
      }
    );
  }

  createChart(data: CategorySales[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.categoryName),
          datasets: [{
            // label: 'Top Selling Categories',
            data: data.map(item => item.salesCount),
            backgroundColor: ['#D669A0', '#534FAC', '#61C9EE', '#FE9900','#4CB140','#7D1007','#009596','#8A8D90','#004B95','#F4B678','#C58C00','#A2D9D9'],
            borderColor: ['#D669A0', '#534FAC', '#61C9EE', '#FE9900','#4CB140','#7D1007','#009596','#8A8D90','#004B95','#F4B678','#C58C00','#A2D9D9'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false 
            },
            
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.raw} units`;
                }
              }
            },
            title: {
              display: false,
              // text: 'Top Selling Categories',
              font: {
                size: 18,
                weight: 'bold'
              },
              padding: {
                top: 10,
                bottom: 20
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                // borderDash: [5 ,5]
              }
            }
          }
        }
      });
    }
  }
  }
