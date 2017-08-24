import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TodoItem } from './todo';

@Injectable()
export class TodoService {

  private todos$ = this.http
    .get('/assets/getTodoList.json')
    .map(r => r.json() as TodoItem[])
    .publishLast().refCount();

  constructor(
    private http: Http,
  ) { }

  getTodoList() {
    return this.todos$;
  }

  addItem(item: TodoItem): Observable<TodoItem> {
    return Observable.of(item);
  }

  updateItem(item: TodoItem): Observable<TodoItem> {
    return Observable.of(item);
  }

  removeItem(item: TodoItem): Observable<void> {
    return Observable.of();
  }

}
