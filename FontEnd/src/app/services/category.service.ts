import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interface/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`http://localhost:8081/api/category`);
  }
  getCategoryById(id: any): Observable<ICategory> {
    return this.http.get<ICategory>(`http://localhost:8081/api/category/${id}`);
  }
  addCategory(category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`http://localhost:8081/api/category`, category);
  }

  deleteCategory(id: any): Observable<ICategory> {
    return this.http.delete<ICategory>(
      `http://localhost:8081/api/category/${id}`
    );
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.patch<ICategory>(
      `http://localhost:8081/api/category/${category._id}`,
      category
    );
  }
}