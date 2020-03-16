import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AnyTxtRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public apiUrl = 'http://localhost:3000';
  headerHttpOptions: any;
  currentUser: any;
  constructor(private http: HttpClient) { }

  saveTodo(userId: string, todoText: string): Observable<any> {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headerHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.currentUser.accessToken
      })
    };

    const body = new HttpParams()
      .set('userId', userId)
      .set('itemText', todoText);

    return this.http.post(this.apiUrl + '/createitem', body, this.headerHttpOptions);
  }

  deleteTodo(todoId: string) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headerHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.currentUser.accessToken
      })
    };

    return this.http.get(this.apiUrl + '/deleteitem/' + todoId, this.headerHttpOptions);
  }

  updateTodo( todoId: string, todoText: string ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headerHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.currentUser.accessToken
      })
    };
    
    const body = new HttpParams()
      .set('todoId', todoId)
      .set('todoText', todoText);

    return this.http.post(this.apiUrl + '/updateitem', body, this.headerHttpOptions);
  }


  getAllTodo(userId: string): Observable<any> {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headerHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.currentUser.accessToken
      })
    };

    const body = new HttpParams()
      .set('userId', userId)

    return this.http.post(this.apiUrl + '/item', body, this.headerHttpOptions);
  }
}


