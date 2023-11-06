import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ICategory } from 'src/app/interface/Category';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  products: IProduct[] = [];
  cateList!: any[]
  constructor(private productService: ProductService, private router: ActivatedRoute, private cartService: CartService) {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data.docs;
        console.log(data.docs);

      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  carts: any[] = this.cartService.getCart();


  onAddCart(product: IProduct) {

    let index = this.carts.findIndex((item) => {
      return item.id == product._id
    })
    if (index >= 0) {
      this.carts[index].quantity += 1
    } else {
      let cartItem: any = {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        subtotal: () => {
          return this.carts[index].price * this.carts[index].quantity
        },
        quantity: 1,
      }
      this.carts.push(cartItem)
    }
    //  console.log(this.carts[0].subtotal());
    // let addCartJson = JSON.stringify(this.carts)
    // sessionStorage.setItem('cart', addCartJson)
    this.cartService.saveCart(this.carts)
    alert("thêm vào giỏ hàng thành công")
  }



}
