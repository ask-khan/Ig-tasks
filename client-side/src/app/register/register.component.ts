import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	loading = false;
	submitted = false;
	showError = false;
	returnUrl: string;
	showMessage: string;
	showSucess = false;

	constructor(
		private formBuilder: FormBuilder,
		private userService: UserService,
		private router: Router,
		private alertService: AlertService
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', Validators.required],
			confirmpassword: ['', Validators.required]
		});
	}

	get f() { return this.registerForm.controls; }


	onSubmit() {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		this.userService.register(this.registerForm.value)
			.pipe()
			.subscribe(
				data => {
					this.showSucess = true;
					this.loading = false;
					this.showMessage = data.message;
				},
				error => {
					this.showError = true;
					this.loading = false;
					this.showMessage = error.error.message;
				}
			);
	}

}
