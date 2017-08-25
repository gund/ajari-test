import { BackgroundHttpService } from '../background-sync/background-http.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Optional, TodoItem } from './todo/todo';
import { TodoService } from './todo/todo.service';

@Component({
  selector: 'app-case-three',
  templateUrl: './case-three.component.html',
  styleUrls: ['./case-three.component.scss']
})
export class CaseThreeComponent {

  todos$ = this.todoService.getTodoList()
    .catch(e => this._handleError(e, []));

  addItem$ = new Subject<TodoItem>();
  updateItem$ = new Subject<[TodoItem, Optional<TodoItem>]>();
  removeItem$ = new Subject<TodoItem>();
  error$ = new Subject<string>();

  addingItem$ = this.addItem$
    .switchMap(item => this.todoService.addItem(item)
      .catch(e => this._handleError(e)));

  updatingItem$ = this.updateItem$
    .switchMap(([item, newItem]) => this.todoService.updateItem(item, newItem)
      .catch(e => this._handleError(e)));

  removingItem$ = this.removeItem$
    .switchMap(item => this.todoService.removeItem(item)
      .catch(e => this._handleError(e)));

  loading$ = this.todos$
    .startWith(null)
    .map(items => !items);

  startWorking$ = this.addItem$
    .merge(this.updateItem$, this.removeItem$)
    .do(() => this.error$.next(''))
    .map(() => true);

  endWorking$ = this.addingItem$
    .merge(this.updatingItem$, this.removingItem$)
    .map(() => false);

  working$ = this.startWorking$.merge(this.endWorking$);

  pendingSyncs$ = this.bgHttp.pendingSyncs$;

  constructor(
    private todoService: TodoService,
    private bgHttp: BackgroundHttpService,
  ) { }

  add(name: string) {
    this.addItem$.next({ name, done: false });
  }

  check(item: TodoItem) {
    this.updateItem$.next([item, { done: true }]);
  }

  uncheck(item: TodoItem) {
    this.updateItem$.next([item, { done: false }]);
  }

  remove(item: TodoItem) {
    this.removeItem$.next(item);
  }

  private _handleError(err: string, data?: any) {
    this.error$.next(err);
    return Observable.of(data);
  }

}
