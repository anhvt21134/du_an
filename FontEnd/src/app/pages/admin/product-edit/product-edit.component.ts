import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/Category';
import { IProduct } from 'src/app/interface/Product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product!: IProduct;
  // ObjectId!: string;
  categories: ICategory[] = [];
  selectedCategoryId: string = '';

  productForm = this.formBuilder.group({
    name: [''],
    author: [''],
    price: [0],
    image: [''],
    quantity: [0],
    categoryId: [''],
    description: [''],
  })

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.route.paramMap.subscribe(param => {
      const id = String(param.get('id'));
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          author: product.author,
          quantity: product.quantity,
          // categoryId: product.categoryId,
          categoryId: String(product.categoryId),
          description: product.description,
          image: product.image,
          
        })
      }, error => console.log(error.message))
    })
  }
  ngOnInit(): void {
    this.loadCategories(); 
    this.selectedCategoryId = this.product.categoryId ? String(this.product.categoryId) : '';
  }
  loadCategories() {
    this.categoryService.getCategory().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Lỗi khi tải danh mục:', error);
      }
    );
  }
  onHandleUpdate() {
    // kiểm tra nếu form hợp lệ 
    if (this.productForm.valid) {
      const newProduct: IProduct = {
        _id: this.product._id,
        name: this.productForm.value.name || '',
        author: this.productForm.value.author || '',
        price: this.productForm.value.price || 0,
        image: this.productForm.value.image || '',
        quantity: this.productForm.value.quantity || 0,
        description: this.productForm.value.description || '',
        categoryId: this.productForm.value.categoryId || '',
      }
      this.productService.updateProduct(newProduct).subscribe(
        (response) => {
          console.log('Cập nhật sản phẩm thành công:', response);
          this.toastr.success('Cập nhật sản phẩm thành công');
          this.router.navigate(['/admin/product']);
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
        }
      );
    }
  }  
  onImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.readFile(file).then((result: string) => {
        this.productForm.patchValue({ image: result });
      });
    }
  }

  readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.onerror = (event: any) => {
        reject(event.target.error);
      };
      reader.readAsDataURL(file);
    });
  }
}
