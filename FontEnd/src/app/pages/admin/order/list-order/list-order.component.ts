import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { FormBuilder } from '@angular/forms';
import { IOrder } from 'src/app/interface/order';




@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {
  listOrder!: IOrder[];

  constructor(
    private OrderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.OrderService.getAllOrder().subscribe(data => {
      this.listOrder = data
    })
    // const id = this.listOrder
    // console.log(id);

    // this.cateService.getCategory()
  }

  removeUser(id: number) {
    const confirm = window.confirm('Are you sure you want to remove')
    if (confirm) {
      this.OrderService.removeOrder(id).subscribe(() => {
        this.listOrder = this.listOrder.filter(item => item.id !== id)
      })
    }
  }
}
