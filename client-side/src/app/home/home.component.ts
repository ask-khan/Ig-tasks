import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { TodoService } from '../services/todo.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddtodoComponent } from '../home/addtodo/addtodo.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	currentUser: User;
	users = []
	username: string;
	userContent: any;
	todoContent: any;
	bsModalRef: BsModalRef;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private todoService: TodoService,
		private modalService: BsModalService
	) {
		this.getCurrentUserTodo();
	}
	ngOnInit(): void {

	}

	delete(todo: any): void {
		this.todoService.deleteTodo(todo._id).subscribe(data => {
			this.getCurrentUserTodo();
		}
		);
	}

	edit( todo :any ) {
		this.bsModalRef = this.modalService.show(AddtodoComponent);
		this.bsModalRef.content.SaveBtnName = 'Update';
		this.bsModalRef.content.modalTitle = 'Update Todo';
		this.bsModalRef.content.todo = todo.itemText;
		this.bsModalRef.content.todoId = todo._id;
		
		this.bsModalRef.content.event.subscribe(data => {
			this.getAllTodo(data.todoContent.userId);
		});
	}

	addTodo() {
		this.bsModalRef = this.modalService.show(AddtodoComponent);
		this.bsModalRef.content.SaveBtnName = 'Save';
		this.bsModalRef.content.modalTitle = 'Add Todo';
		/* PARENT COMPONENT */
		this.bsModalRef.content.event.subscribe(data => {
			this.getAllTodo(data.todoContent.userId);
		});
	}

	getAllTodo(userId: string) {
		this.todoService.getAllTodo(userId).subscribe(
			data => {
				
				if ( data.code != 401 ) {
					this.todoContent = data;
				} else {
					this.router.navigate(['logout']);
				}
				
			}
		);
	}

	getCurrentUserTodo() {
		this.userContent = localStorage.getItem('currentUserContent');
			if (this.userContent != null) {
				this.userContent = JSON.parse(this.userContent);
				this.username = this.userContent.content.username;
				this.getAllTodo(this.userContent.content._id);
			}
	}

	deleteUser(id: number) {

	}

	logout() {
		this.userService.logout();
	}

	private loadAllUsers() {

	}

}
