import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../interface/Comment';
import * as moment from 'moment';
@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:3000/comments'; // URL của API cơ sở dữ liệu

    constructor(private http: HttpClient) { }

    getComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(this.apiUrl);
    }

    addComment(comment: Comment): Observable<any> {
        comment.createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        return this.http.post(this.apiUrl, comment);
    }

    deleteComment(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete(url);
    }
}