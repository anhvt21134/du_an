import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';


import { IOrder } from 'src/app/interface/order';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss']
})
export class DetailOrderComponent {
  detailOrder: any = []
  idUser: number = this.UserService.getID()
  constructor(
    private orderService: OrderService,
    private UserService: UserService
  ) {
    this.orderService.getOrderById(this.idUser).subscribe(data => {
      this.detailOrder = data
    })
  }
}
