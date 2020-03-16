import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-addtodo',
  templateUrl: './addtodo.component.html',
  styleUrls: ['./addtodo.component.css']
})
export class AddtodoComponent implements OnInit {
  todo: string;
  todoId: string;
  submitted = false;
  currentUserContent: any;
  /* CHILD COMPONENT */
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public bsModalRef: BsModalRef, private todoService: TodoService) { }

  ngOnInit() {}

  

  saveTodo( saveContent: string ) {
    if ( saveContent == 'Save' ) {
      if ( this.todo != undefined ) {
        this.currentUserContent = JSON.parse(localStorage.getItem('currentUserContent'));
        
        this.todoService.saveTodo( this.currentUserContent.content._id ,this.todo ).subscribe(
          todoContent => {
            this.event.emit({ 'todoContent': todoContent});
          }
        )    
       
        this.bsModalRef.hide();
      }
    } else {
      this.currentUserContent = JSON.parse(localStorage.getItem('currentUserContent'));
        
      this.todoService.updateTodo( this.todoId ,this.todo ).subscribe(
        todoContent => {
          this.event.emit({ 'todoContent': todoContent});
        }
      )    
     
      this.bsModalRef.hide();
    }
    
  }

}
