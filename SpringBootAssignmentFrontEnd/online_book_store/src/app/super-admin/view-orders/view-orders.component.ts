import { Component } from '@angular/core';
import { Order } from '../../model/order';
import { AdminserviceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent {
  orders: Order[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  statusOptions: string[] = ['PLACED', 'SHIPPED', 'OUT-FOR-DELIVERY', 'DELIVERED', 'CANCELLED'];

  constructor(private orderService: AdminserviceService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: Order[]) => {
        this.orders = response.reverse();
        console.log(response);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  onStatusChange(event: Event, orderId: number): void {
    const target = event.target as HTMLSelectElement;
    const status = target.value;

    this.orderService.updateOrderStatus(orderId, status, ).subscribe(
      (response) => {
        console.log('Order status updated successfully', response);
        this.getAllOrders(); 
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.orders.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.itemsPerPage);
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
}
