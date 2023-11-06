import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interface/User';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }
    // đăng nhập đăng kí
    signin(user: IUser): Observable<IUser[]> {
        return this.http.post<IUser[]>(`http://localhost:8080/api/signin`, user);
    }
    signup(user: IUser): Observable<IUser[]> {
        return this.http.post<IUser[]>(`http://localhost:8080/api/signup`, user);
    }
    // actions user
    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(`http://localhost:8080/api/users`);
    }
    removetUsers(id: any): Observable<IUser[]> {
        return this.http.delete<IUser[]>(`http://localhost:8080/api/users/${id}`);
    }
    getUser(id: any): Observable<IUser> {
        return this.http.get<IUser>(`http://localhost:8080/api/users/${id}`);
    }
    editUser(user: IUser): Observable<IUser> {
        return this.http.patch<IUser>(
            `http://localhost:8080/api/users/${user._id}`,
            user
        );
    }

    saveRole(carts: any) {
        let roleJson = JSON.stringify(carts);
        // sessionStorage.setItem('cart',cartJson)
        localStorage.setItem('user', roleJson);
    }

    getRole(): any {
        const data = JSON.parse(localStorage?.getItem('user') as string);
        if (data) {
            const role = data.user.role;
            return role;
        } else {
            return null;
        }
    }

    getID() {
        const data = JSON.parse(localStorage?.getItem('user') as string);
        if (data) {
            const id = data.user._id;
            return id;
        } else {
            return null;
        }
    }
    getToken() {
        // Lấy token từ nơi lưu trữ (ví dụ: localStorage)
        const token = JSON.parse(localStorage.getItem('user')!)?.accessToken || null;
        return token;
    }
}
