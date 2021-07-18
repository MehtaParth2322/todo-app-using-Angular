import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title = 'todo-app';
  todos: todo[] = [];
  mode = false; // add
  id = 0;
  submitted = false;
    checkoutForm: any;

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      sdate: ['', Validators.required],
      edate: ['', Validators.required],
      status: ['', Validators.required],
    });
    if (localStorage.getItem('todos')) {
      console.log(localStorage.getItem('todos'));
      const oldTodos: any = localStorage.getItem('todos');
      this.todos = JSON.parse(oldTodos);
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        console.log(params['id']);
        this.id = params['id'];
        this.mode = true; //edit
        const todo = this.todos[params['id']];
        console.log(todo);
        this.checkoutForm.controls['title'].setValue(todo.title);
        this.checkoutForm.controls['description'].setValue(todo.description);
        this.checkoutForm.controls['sdate'].setValue(todo.sdate);
        this.checkoutForm.controls['edate'].setValue(todo.edate);
        this.checkoutForm.controls['status'].setValue(todo.status);
      }
    });
  }

  get formControl() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.checkoutForm);
    if (this.checkoutForm.valid) {
      if (!this.mode) {
        console.log(this.checkoutForm.value);
        this.todos.push(this.checkoutForm.value);
      } else {
        this.todos[this.id] = this.checkoutForm.value;
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));

      this._router.navigateByUrl('/');
    }
  }
}

export interface todo {
  description: string;
  title: string;
  status: string;
  sdate: any;
  edate: any;
}
