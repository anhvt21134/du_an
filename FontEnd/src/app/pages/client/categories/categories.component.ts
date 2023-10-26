import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/Category';
import { IProduct } from 'src/app/interface/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category !: ICategory;
  products!: IProduct[];
  categories!: ICategory[];
  filteredProducts: IProduct[] = [];
  categoryFilter: string | null = null;
  priceFilter: string | null = null;
  searchQuery: string = '';
  productForm: FormGroup;
  constructor(
    private CategoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productService.getProductsAdmin().subscribe((products: any) => {
          this.products = products.docs.filter((product: IProduct) => product.categoryId === id);
          console.log(this.products);
          console.log({ id })
        })
      } else {
        this.productService.getProductsAdmin().subscribe(
          (data: any) => {
            this.products = data.docs;
            console.log(data.docs);
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    })
    this.CategoryService.getCategory().subscribe((data) => {
      this.categories = data
    }, error => {
      console.log(error.message);
    })
    {
      this.productForm = this.formBuilder.group({
        image: ['']
      });
    }
  }
  ngOnInit(): void {
    this.loadProducts();

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



  getCategoryName(categoryId: string | number | undefined): string {
    const categoryIdStr =
      typeof categoryId === 'number'
        ? categoryId.toString()
        : (categoryId as string);
    const category = this.categories.find((c) => c._id === categoryIdStr);
    return category ? category.name : '';
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