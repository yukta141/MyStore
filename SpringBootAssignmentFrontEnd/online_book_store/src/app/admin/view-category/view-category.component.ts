import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import Swal from 'sweetalert2';
import { Category } from '../../model/category';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css',
})
export class ViewCategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategoryDetails().subscribe((categories) => {
      this.categories = categories.reverse();
    });
  }

  deleteCategory(id: any) {
    console.log('category id is' + id);

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            this.loadCategories();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the category.',
              'error'
            );
          }
        );
      }
    });
  }
}
