import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/Category';
import { IProduct } from 'src/app/interface/Product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  category !: ICategory;
  products!: IProduct[];
  categories!: ICategory[];

  constructor(
    private CategoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.productService.getProductsAdmin().subscribe((products: any) => {
          this.products = products.docs.filter((product: IProduct) => product.categoryId === id);
          console.log(this.products);
          console.log({id})
        })
      }else{
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
  }
}