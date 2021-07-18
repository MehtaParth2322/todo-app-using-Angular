import { Component, OnInit } from '@angular/core';
import { todo } from '../add-todo/add-todo.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: todo[] = [];
  mode = 0; // add
  constructor(private route: Router) {
    if (localStorage.getItem('todos')) {
      const oldTodos: any = localStorage.getItem('todos');
      this.todos = JSON.parse(oldTodos);
      console.log(this.todos);
    }
  }

  ngOnInit(): void {}
  edit(item: any) {
      const id = this.todos.findIndex((i) => i.title == item.title);
      this.route.navigateByUrl('/addTodo?id=' + id);
  }
  delete(item: todo) {
    const id = this.todos.findIndex((i) => i.title == item.title);
    console.log(id);
    this.todos.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
    // window.location.reload();
  }
}
