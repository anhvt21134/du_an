import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ICategory } from 'src/app/interface/Category';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  category: ICategory[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategory().subscribe(
      (data) => {
        this.category = data;
        console.log(data);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

removeItem(id: any) {
  Swal.fire({
    title: 'Xác nhận xóa',
    text: 'Bạn có chắc chắn muốn xóa mục này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        Swal.fire('Xóa thành công', '', 'success');
        this.category = this.category.filter((categories) => categories._id !== id);
      });
    }
  });
}
}




