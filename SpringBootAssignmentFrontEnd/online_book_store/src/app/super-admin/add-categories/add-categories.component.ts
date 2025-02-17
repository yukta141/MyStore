import { Component } from '@angular/core';
import { Category } from '../../model/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent {
  submitted = false;
  bookCategories: Category[] = [];

  category = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryImage: new FormControl('', Validators.required),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateProductFormCategories();
  }

  addCategory = () => {
    this.submitted = true;
    if (this.category.valid) {
      const categoryName = this.category.get('categoryName')?.value ?? '';
      const categoryImage = this.extractFilename(
        this.category.get('categoryImage')?.value ?? ''
      );
      const newCategory = new Category(categoryName, categoryImage);

      this.categoryService.addCategory(newCategory).subscribe(() => {
        Swal.fire('Success!', 'Category added successfully!', 'success').then(
          () => {
            this.router.navigate(['/viewcategory']);
          }
        );
      });
      return;
    }
  };

  extractFilename(fullPath: string): string {
    const parts = fullPath.split(/[\\/]/);
    return parts[parts.length - 1];
  }

  updateProductFormCategories() {
    this.categoryService.getCategoryDetails().subscribe((categories) => {
      this.bookCategories = categories;
    });
  }
}
