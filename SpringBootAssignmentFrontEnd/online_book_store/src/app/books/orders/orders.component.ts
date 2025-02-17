import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/order';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: Order[][] = [];
  userId: number = 0;
  groupId: string = '';
  // currentStatus:string='';

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
  
    // console.log("yukta patil");
    this.loadOrders();
  }

  loadOrders(): void {
    console.log("order started 1");

    this.userId = Number(sessionStorage.getItem('userId'));
      console.log('for order' + this.userId);

      this.bookservice.getOrdersByUserId(this.userId).subscribe(
        (order) => {
          const groupedOrders: Order[][] = order
            .reverse()
            .reduce((acc: Order[][], curr: Order) => {
              const groupIndex = acc.findIndex(
                (group) => group.length > 0 && group[0].groupId === curr.groupId
              );
              if (groupIndex !== -1) {
                acc[groupIndex].push(curr);
              } else {
                acc.push([curr]);
              }
              return acc;
            }, []);
          console.log(groupedOrders);
          this.orders = groupedOrders;

        },
        (error) => {
          console.log(error);
        }
      );
    }

    isCompleted(orderStatus:string,currentStatus: string): boolean {
      
      const statusOrder = ['PLACED', 'SHIPPED','OUT-FOR-DELIVERY', 'DELIVERED','CANCELLED'];
      // return statusOrder.indexOf(status) <= statusOrder.indexOf(currentStatus);
      return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(orderStatus);
    }
    
    isActive(orderStatus:string, currentStatus: string): boolean {
      return currentStatus === orderStatus;
    }
  }

