import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interface/order';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(
        private http: HttpClient
    ) { }
    addOrder(orders: IOrder): Observable<IOrder> {
        return this.http.post<IOrder>(`http://localhost:8081/api/order`, orders)
    }
    getAllOrder(): Observable<IOrder[]> {
        return this.http.get<IOrder[]>(`http://localhost:8081/api/order`)
    }
    removeOrder(id: number): Observable<IOrder> {
        return this.http.delete<IOrder>(`http://localhost:8081/api/order/${id}`)
    }
    getOrderById(id: number): Observable<IOrder> {
        return this.http.get<IOrder>(`http://localhost:8081/api/order?idUser=${id}`)
    }
}
