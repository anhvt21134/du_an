import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ServicesService {

    constructor(
        private http: HttpClient
    ) { }



    // Cart ---------------------------------------------------------
    getCart() {
        let cartJson = sessionStorage.getItem('cart')
        if (cartJson) {
            return JSON.parse(cartJson)
        } else {
            return []
        }
    }

    saveCart(carts: any) {
        let cartJson = JSON.stringify(carts)
        sessionStorage.setItem('cart', cartJson)
    }

    getCartQuatity() {
        let carts = this.getCart();
        // console.log(carts);
        let total: number = 0
        carts.forEach((item: any) => {
            total += item.quantity
        });
        return total
    }

    getCartPrice() {
        let carts = this.getCart();
        // console.log(carts);
        let total: number = 0
        // for( let item of carts){
        //   total += item.quantity * item.price
        // }
        carts.forEach((item: any) => {
            total += item.quantity * item.price
        });
        return total
    }


}


