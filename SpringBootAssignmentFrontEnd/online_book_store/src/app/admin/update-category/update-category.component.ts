import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Category } from '../../model/category';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css',
})
export class UpdateCategoryComponent {
  submitted = false;
  private oldcategoryId: any = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.oldcategoryId = this.route.snapshot.params['id'];
    this.updateCategoryFormValues();
  }

  category = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    categoryImage: new FormControl('', Validators.required),
  });

  updateCategoryFormValues() {
    this.categoryService
      .getCategoryById(this.oldcategoryId)
      .subscribe((category) => {
        this.category.patchValue({
          categoryName: category.categoryName,
          categoryImage: category.categoryImage,
        });
      });
  }

  updateCategory = () => {
    this.submitted = true;
    if (this.category.valid) {
      const categoryName = this.category.get('categoryName')?.value ?? '';
      const categoryImage = this.extractFilename(
        this.category.get('categoryImage')?.value ?? ''
      );
      const updatedCategory = new Category(categoryName, categoryImage);

      this.categoryService
        .updateCategory(this.oldcategoryId, updatedCategory)
        .subscribe(() => {
          Swal.fire(
            'Success!',
            'Category updated successfully!',
            'success'
          ).then(() => {
            this.router.navigate(['/viewCategory']);
          });
        });
      return;
    }
  };

  extractFilename(fullPath: string): string {
    const parts = fullPath.split(/[\\/]/);
    return parts[parts.length - 1];
  }
}
