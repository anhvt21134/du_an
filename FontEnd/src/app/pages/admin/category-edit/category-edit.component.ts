import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/interface/Category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: ICategory = {_id: '', name: ''};

  categoryForm = this.formBuilder.group({
    name: [''],
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}
    
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      const id = String(param.get('id'));
      this.categoryService.getCategoryById(id).subscribe(
        category => {
          this.category = category;
          this.categoryForm.patchValue({
            name: category.name
          });
        },
        error => console.log(error.message)
      );
    });
  }

  onHandleUpdate() {
    if (this.categoryForm.valid) {
      const newCategory: ICategory = {
        _id: this.category._id,
        name: this.categoryForm.value.name || '',
      };
      this.categoryService.updateCategory(newCategory).subscribe(
        (response) => {
          console.log('Cập nhật sản phẩm thành công:', response);
          this.toastr.success('Cập nhật sản phẩm thành công');
          this.router.navigate(['/admin/category']);
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
      );
    }
  }
}