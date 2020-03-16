import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	currentUser: any;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,

	) {
		this.currentUser = localStorage.getItem('currentUserContent');
		
		if ( this.currentUser != null ) {
			this.currentUser = this.currentUser;
			this.router.navigate(['todo/' + this.currentUser.content._id]);
		}
		
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			grant_type: 'password'
		});

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		this.userService.signin(this.loginForm.value)
		.subscribe(
			data => {
				localStorage.setItem('currentUser', JSON.stringify(data));
				this.loading = false;
				if ( data.accessToken != undefined ){
					this.userService.signinApplication(this.loginForm.value.username, this.loginForm.value.password, data.accessToken).pipe()
					.subscribe(
						signInContent => {

							if (signInContent != null && signInContent != undefined) {
								localStorage.setItem('currentUserContent', JSON.stringify( signInContent ));
								this.router.navigate(['todo/' + signInContent.content._id]);
							} 

						}
					)
				} else {

				}
			},
			error => {
				this.loading = false;
			}
		);
	}

	

}
