import { Component } from '@angular/core';
import { AdminUsersService } from '../../service/admin-users.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  user: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private adminUsersService: AdminUsersService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminUsersService.getAllUsers().subscribe(users => {
      // this.user = users.reverse();
      this.user = users.filter(user => user.userRole === 'USER').reverse();
    });
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.user.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.user.length / this.itemsPerPage);
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
