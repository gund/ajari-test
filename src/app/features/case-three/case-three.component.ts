import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Optional, TodoItem } from './todo/todo';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-case-three',
  templateUrl: './case-three.component.html',
  styleUrls: ['./case-three.component.scss']
})
export class CaseThreeComponent {

  todos$ = this.todoService.getTodoList();

  addItem$ = new Subject<TodoItem>();
  updateItem$ = new Subject<[TodoItem, Optional<TodoItem>]>();
  removeItem$ = new Subject<TodoItem>();

  addingItem$ = this.addItem$.switchMap(item => this.todoService.addItem(item));
  updatingItem$ = this.updateItem$.switchMap(([item, newItem]) => this.todoService.updateItem(item, newItem));
  removingItem$ = this.removeItem$.switchMap(item => this.todoService.removeItem(item));

  loading$ = this.todos$
    .startWith(null)
    .map(items => !items);

  startWorking$ = this.addItem$
    .merge(this.updateItem$, this.removeItem$)
    .map(() => true);

  endWorking$ = this.addingItem$
    .merge(this.updatingItem$, this.removingItem$)
    .map(() => false);

  working$ = this.startWorking$.merge(this.endWorking$);

  constructor(
    private todoService: TodoService
  ) { }

  add(name: string) {
    this.addItem$.next({ name, done: false });
  }

  check(item: TodoItem) {
    console.log('check', item);
    this.updateItem$.next([item, { done: true }]);
  }

  uncheck(item: TodoItem) {
    console.log('uncheck', item);
    this.updateItem$.next([item, { done: false }]);
  }

  remove(item: TodoItem) {
    this.removeItem$.next(item);
  }

}
