import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { AdminUsersService } from '../../service/admin-users.service';
import { Chart } from 'chart.js/auto';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  totalCategories: number | undefined;
  totalBooks: number | undefined;
  totalUsers: number | undefined;
  totalOrders: number | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  chart: any;

  constructor(
    private categoryService: CategoryService,
    private productService: AdminserviceService,
    private userService: AdminUsersService,
  ) {}

  // ngOnInit(): void {
  //   this.loadCategoriesCount();
  //   this.loadProductsCount();
  //   this.loadUsersCount();
  //   this.loadOrdersCount();
    
  // }

  ngOnInit(): void {
    this.loadCategoriesCount();
    this.loadProductsCount();
    this.loadUsersCount();
    this.loadOrdersCount();

    const userId = Number(sessionStorage.getItem('userId'));
    // this.productService.countOrdersBySeller(userId).subscribe(data => {
    //   console.log('order responsee',data);
      
    //   const sellerIds = Object.keys(data);
    //   const orderCounts = Object.values(data);
    //   console.log("ordercounts",orderCounts);
      

    //   this.chart = new Chart('canvas', {
    //     type: 'bar',
    //     data: {
    //       labels: sellerIds,
    //       datasets: [{
    //         label: 'Number of Orders per Seller',
    //         data: orderCounts,
    //         backgroundColor: '#1a1f36',
    //         borderColor: 'rgba(75, 192, 192, 1)',
    //         borderWidth: 1
    //       }]
    //     },
    //     options: {
    //       scales: {
    //         y: { beginAtZero: true }
    //       }
    //     }
    //   });
    // });
  }

  
  @ViewChild('statsChart') statsChartRef!: ElementRef;
  statsChart: Chart | undefined;

  
  loadCategoriesCount() {
    this.categoryService.getCategoriesCount().subscribe(
      (count) => {
        this.totalCategories = count;
        this.updateStatsChart();
      },
      (error) => {
        console.error('Error fetching categories count:', error);
      }
    );
  }

  loadProductsCount() {
    const userId = Number(sessionStorage.getItem('userId'));
    this.productService.countBooksBySeller(userId).subscribe(
      (count) => {
        this.totalBooks = count;
        this.updateStatsChart();
      },
      (error) => {
        console.error('Error fetching products count:', error);
      }
    );
  }

  loadUsersCount() {
    this.userService.getUsersCount().subscribe(
      (count) => {
        this.totalUsers = count;
        this.updateStatsChart();
      },
      (error) => {
        console.error('Error fetching users count:', error);
      }
    );
  }

  loadOrdersCount() {
    const userId = Number(sessionStorage.getItem('userId'));
    this.productService.countOrdersBySeller(userId).subscribe(
      (count) => {
        this.totalOrders = count;
        this.updateStatsChart();
      },
      (error) => {
        console.error('Error fetching orders count:', error);
      }
    );
  }

  initializeStatsChart() {
    if (this.statsChart) {
      this.statsChart.destroy(); 
    }

    const statsChartCanvas = this.statsChartRef.nativeElement;
    if (!statsChartCanvas) {
      console.error('Could not find stats chart canvas element');
      return;
    }

    const statsChartCtx = statsChartCanvas.getContext('2d');
    if (!statsChartCtx) {
      console.error('Could not get context for stats chart');
      return;
    }

    console.log('Initializing stats chart');
    this.statsChart = new Chart(statsChartCtx, {
      type: 'bar',
      data: {
        labels: ['Books', 'Categories', 'Users', 'Orders'],
        datasets: [
          {
            // label: 'Count',
            
            data: [],
            backgroundColor: ['#D669A0', '#534FAC', '#61C9EE', '#FE9900'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, 
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  

  updateStatsChart() {
    if (!this.statsChart) {
      this.initializeStatsChart();
    }
    if (this.statsChart && this.statsChart.data.datasets) {
      this.statsChart.data.datasets[0].data = [
        this.totalBooks || 0,
        this.totalCategories || 0,
        this.totalUsers || 0,
        this.totalOrders || 0,
      ];
      this.statsChart.update();
    }
  }
}


  
