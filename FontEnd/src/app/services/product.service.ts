import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/interface/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:8081/api/products`);
  }
  getProductsAdmin(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`http://localhost:8081/api/productss`);
  }
  deleteProduct(id: any): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `http://localhost:8081/api/products/${id}`
    );
  }
  getProductById(id: any): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:8081/api/products/${id}`);
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      `http://localhost:8081/api/products`,
      product
    );
  }

  uploadImage(images: File): Observable<string> {
    const formData = new FormData();
    formData.append('images', images);
    return this.http.post<any>('http://localhost:8081/api/images/upload', formData);
  }
  
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `http://localhost:8081/api/products/${product._id}`,
      product
    );
  }
}
