import { Component } from '@angular/core';
import { User } from '../../model/user';
import { SuperAdminService } from '../../service/super-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-see-users',
  templateUrl: './see-users.component.html',
  styleUrl: './see-users.component.css'
})
export class SeeUsersComponent {
  user: User[] = [];

  constructor(private superAdminService: SuperAdminService){}

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.superAdminService.getAllSellers().subscribe((sellers) => {
      this.user = sellers.reverse();
    });
  }
  blockUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to block this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, block!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.superAdminService.blockUser(userId).subscribe(
          () => {
            const user = this.user.find((u) => u.userId === userId);
            if (user) {
              user.blocked = true;
            }
            Swal.fire('Blocked!', 'The user has been blocked.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Error blocking user.', 'error');
            console.log('Error blocking user:', error);
          }
        );
      }
    });
  }
  
  unblockUser(userId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to unblock this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unblock!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.superAdminService.unblockUser(userId).subscribe(
          () => {
            const user = this.user.find((u) => u.userId === userId);
            if (user) {
              user.blocked = false;
            }
            Swal.fire('Unblocked!', 'The user has been unblocked.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Error unblocking user.', 'error');
            console.log('Error unblocking user:', error);
          }
        );
      }
    });
  }
  

}
