import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-top-sales',
  templateUrl: './top-sales.component.html',
  styleUrl: './top-sales.component.css'
})
export class TopSalesComponent {

  public chartData: any[] = [];
  public chartLabels: string[] = [];
  public chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  constructor(private categoryService: CategoryService) { }

  

}
