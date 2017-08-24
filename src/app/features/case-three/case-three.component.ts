import { Component } from '@angular/core';

import { TodoItem } from './todo/todo';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-case-three',
  templateUrl: './case-three.component.html',
  styleUrls: ['./case-three.component.scss']
})
export class CaseThreeComponent {

  todos$ = this.todoService.getTodoList();

  constructor(
    private todoService: TodoService
  ) { }

  add(name: string) {
    this.todoService.addItem({ name, done: false });
  }

  check(item: TodoItem) {
    item.done = true;
    this.todoService.updateItem(item);
  }

  uncheck(item: TodoItem) {
    item.done = false;
    this.todoService.updateItem(item);
  }

  remove(item: TodoItem) {
    this.todoService.removeItem(item);
  }

}
