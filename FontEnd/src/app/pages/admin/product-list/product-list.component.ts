
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ProductService } from 'src/app/services/product.service';
// import { CategoryService } from 'src/app/services/category.service';
// import { IProduct } from 'src/app/interface/Product';
// import { ICategory } from 'src/app/interface/Category';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.scss'],
// })
// export class ProductListComponent implements OnInit {
//   products: IProduct[] = [];
//   categories: ICategory[] = [];
//   filteredProducts: IProduct[] = [];
//   categoryFilter: string | null = null;
//   nameFilter: string = '';
//   productForm: FormGroup;

//   constructor(
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private formBuilder: FormBuilder
//   ) {
//     this.productForm = this.formBuilder.group({
//       image: ['']
//     });
//   }

//   ngOnInit(): void {
//     this.loadProducts();
//     this.loadCategories();
//   }

//   loadProducts() {
//     this.productService.getProductsAdmin().subscribe(
//       (data: any) => {
//         this.products = data.docs.map((product: IProduct) => {
//           return {
//             ...product,
//             // image: `https://res.cloudinary.com/dzo94imrh/image/upload/${product.image}`,
//           };
//         });
//         this.filteredProducts = this.products;
//         console.log(data.docs);
//       },
//       (error) => {
//         console.log(error.message);
//       }
//     );
//   }

//   loadCategories() {
//     this.categoryService.getCategory().subscribe(
//       (categories) => {
//         this.categories = categories;
//       },
//       (error) => {
//         console.error('Lỗi khi tải danh mục:', error);
//       }
//     );
//   }

//   getCategoryName(categoryId: string | number | undefined): string {
//     const categoryIdStr =
//       typeof categoryId === 'number'
//         ? categoryId.toString()
//         : (categoryId as string);
//     const category = this.categories.find((c) => c._id === categoryIdStr);
//     return category ? category.name : '';
//   }

//   removeItem(id: any) {
//     Swal.fire({
//       title: 'Xác nhận xóa',
//       text: 'Bạn có chắc chắn muốn xóa mục này?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Xóa',
//       cancelButtonText: 'Hủy',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         this.productService.deleteProduct(id).subscribe(() => {
//           Swal.fire('Xóa thành công', '', 'success');
//           this.products = this.products.filter((product) => product._id !== id);
//           this.filteredProducts = this.filteredProducts.filter(
//             (product) => product._id !== id
//           );
//         });
//       }
//     });
//   }

//   filterProducts() {
//     this.filteredProducts = this.products.filter((product) => {
//       if (
//         (this.categoryFilter !== null && this.categoryFilter !== '' && product.categoryId !== this.categoryFilter) ||
//         (this.nameFilter !== '' && !product.name.toLowerCase().includes(this.nameFilter.toLowerCase()))
//       ) {
//         return false;
//       }
//       return true;
//     });
//   }

//   resetFilters() {
//     this.categoryFilter = null;
//     this.nameFilter = '';
//     this.filterProducts();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { IProduct } from 'src/app/interface/Product';
import { ICategory } from 'src/app/interface/Category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  filteredProducts: IProduct[] = [];
  categoryFilter: string | null = null;
  priceFilter: string | null = null;
  searchQuery: string = '';
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      image: ['']
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProductsAdmin().subscribe(
      (data: any) => {
        this.products = data.docs.map((product: IProduct) => {
          return {
            ...product,
            // image: `https://res.cloudinary.com/dzo94imrh/image/upload/${product.image}`,
          };
        });
        this.filteredProducts = this.products;
        console.log(data.docs);
      },
      (error) => {
        console.log(error.message);
      }
    );
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

  getCategoryName(categoryId: string | number | undefined): string {
    const categoryIdStr =
      typeof categoryId === 'number'
        ? categoryId.toString()
        : (categoryId as string);
    const category = this.categories.find((c) => c._id === categoryIdStr);
    return category ? category.name : '';
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
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire('Xóa thành công', '', 'success');
          this.products = this.products.filter((product) => product._id !== id);
          this.filteredProducts = this.filteredProducts.filter(
            (product) => product._id !== id
          );
        });
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      if (
        (this.categoryFilter !== null && this.categoryFilter !== '' && product.categoryId !== this.categoryFilter) ||
        (this.priceFilter === "0-50000" && product.price > 50000) ||
        (this.priceFilter === "50000-100000" && (product.price <= 50000 || product.price > 100000)) ||
        (this.priceFilter === "100000+" && product.price <= 100000)
      ) {
        return false;
      }
      
      if (this.searchQuery !== '') {
        const productName = product.name.toLowerCase();
        const searchValue = this.searchQuery.toLowerCase();
        if (!productName.includes(searchValue)) {
          return false;
        }
      }

      return true;
    });
  }

  resetFilters() {
    this.categoryFilter = null;
    this.priceFilter = null;
    this.searchQuery = '';
    this.filterProducts();
  }
}
