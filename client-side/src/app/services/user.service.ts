import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { UserLogin } from '../model/userLogin'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	public apiUrl = 'http://localhost:3000';
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	public headerHttpOptions;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic YXBwbGljYXRpb246c2VjcmV0'
		})
	};

	constructor(private http: HttpClient, private route: ActivatedRoute,
		private router: Router, ) {
	}

	register(user: User) {
		return this.http.post(this.apiUrl + '/signup', user);
	}

	signin(userContent: UserLogin) : Observable< any > {
		const body = new HttpParams()
			.set('username', userContent.username)
			.set('password', userContent.password)
			.set('grant_type', 'password');

		return this.http.post< any >(this.apiUrl + '/oauth/token', body, this.httpOptions)
	}

	signinApplication(username: string, password: string, accessToken: string) {
		this.headerHttpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer ' + accessToken
			})
		};

		const body = new HttpParams()
			.set('username', username)
			.set('password', password);

		return this.http.post(this.apiUrl + '/signin', body, this.headerHttpOptions);
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		localStorage.removeItem('currentUserContent');
		this.router.navigate(['/login']);
	}
}
