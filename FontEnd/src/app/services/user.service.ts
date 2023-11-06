import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interface/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  signup(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`http://localhost:8081/api/signup`, user);
  }
  signin(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('http://localhost:8081/api/signin', user);
  }
  isAuthenticated(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  saveRole(carts: any) {
    let roleJson = JSON.stringify(carts)
    // sessionStorage.setItem('cart',cartJson)
    localStorage.setItem('user', roleJson);
  }

  getRole(): any {
    const data = JSON.parse(localStorage?.getItem('user') as string)
    if (data) {
      const role = data.user.role
      return role
    } else {
      return null
    }
  }

  getID() {
    const data = JSON.parse(localStorage?.getItem('user') as string)
    if (data) {
      const id = data.user.id
      return id
    } else {
      return null
    }
  }

}
