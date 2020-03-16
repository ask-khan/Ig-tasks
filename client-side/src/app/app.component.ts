import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../app/model/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	currentUser: any;

	constructor(private router: Router) {

		if (localStorage.getItem('currentUserContent') == undefined || localStorage.getItem('currentUserContent') == null) {
			this.router.navigate(['/login']);
		} else {
			this.currentUser = localStorage.getItem('currentUserContent');
			this.currentUser = JSON.parse( this.currentUser );

			this.router.navigate(['/todo/' + this.currentUser.content._id]);
		}
	}

	logout() {

	}
}
