import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  product!: IProduct;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id') ;
      this.productService.getProductById(id).subscribe(product => {
        this.product = product;
      }, error => console.log(error.message))
    })
  }
  }

