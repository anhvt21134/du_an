import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { OrderService } from 'src/app/services/order.service';
import { IOrder } from 'src/app/interface/order';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  buy: boolean = false;
  carts: any = []
  totalQuantity: number = this.appService.getCartQuatity()
  totalPrice: number = this.appService.getCartPrice()
  idUser: number = this.UserService.getID()
  currentDateTime: string;
  role: number = this.UserService.getRole()

  constructor(
    private appService: ServicesService,
    private OrderService: OrderService,
    private Route: Router,
    private UserService: UserService
  ) {
    const vietnamTimeZone = 'Asia/Ho_Chi_Minh';
    const now = DateTime.now().setZone(vietnamTimeZone);
    this.currentDateTime = now.toFormat('yyyy-MM-dd HH:mm:ss');
  }

  ngOnInit(): void {
    this.carts = this.appService.getCart()
  }
  subtotal(cart: any) {
    return cart.quantity * cart.price
  }
  updateQuantity(index: number, event: any) {
    let newQuantity = event.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    event.target.value = newQuantity
    this.carts[index].quantity = event.target.value
    this.appService.saveCart(this.carts)

    this.totalQuantity = this.appService.getCartQuatity()
    this.totalPrice = this.appService.getCartPrice()
  }

  giam(idex: number, quaty: any) {
    let newQuantity = parseInt(quaty) - 1;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.carts[idex].quantity = newQuantity;
    this.appService.saveCart(this.carts)

    this.totalQuantity = this.appService.getCartQuatity()
    this.totalPrice = this.appService.getCartPrice()
  }
  tang(idex: number, quaty: any) {
    let newQuantity = parseInt(quaty) + 1;
    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    this.carts[idex].quantity = newQuantity;
    this.appService.saveCart(this.carts)

    this.totalQuantity = this.appService.getCartQuatity()
    this.totalPrice = this.appService.getCartPrice()
  }
  removeCart(index: number) {
    const confirm = window.confirm("Bạn có muốn xóa sản phẩm ")
    if (confirm) {
      this.carts.splice(index, 1)
      this.appService.saveCart(this.carts)

      this.totalQuantity = this.appService.getCartQuatity()
      this.totalPrice = this.appService.getCartPrice()
    }
  }

  removeCartAll() {
    const confirm = window.confirm("Bạn có muốn xóa hết giỏ hàng hay không ")
    if (confirm) {
      sessionStorage.clear()
      this.carts = []
    }
  }


  // buy
  buyNow() {
    const confirm = window.confirm("Bạn có chắc muốn mua hàng")
    if (confirm) {
      if (this.role == 0) {
        const listOder: IOrder = {
          idUser: this.idUser,
          idProduct: this.carts,
          quantyti: this.totalQuantity,
          total: this.totalPrice,
          days: this.currentDateTime,
          status: 1
        }
        this.OrderService.addOrder(listOder).subscribe(() => {
          sessionStorage.clear()
          this.carts = []
          this.Route.navigate(["/detailorder"])
        })
      } else if (this.role == 1) {
        alert('bạn là amdin ko đc mua hàng')
      }
      // } else {
      //   alert('bạn cần đăng nhập')
      //   this.Route.navigate(["/signin"])
      // }

    }

  }

}
