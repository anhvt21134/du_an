import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {
    this.productService.getProducts().subscribe(
      (data:any) => {
        this.products = data.docs;
        console.log(data.docs);
        
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
