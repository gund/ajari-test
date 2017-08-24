import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Optional, TodoItem } from './todo';

@Injectable()
export class TodoService {

  private setTodos$ = new BehaviorSubject<TodoItem[] | null>(null);

  private originalTodos$ = this.http
    .get('/api/todo')
    .map(r => r.json() as TodoItem[])
    .publishLast().refCount();

  constructor(
    private http: Http,
  ) { }

  getTodoList(): Observable<TodoItem[]> {
    return this.setTodos$.getValue()
      ? this.setTodos$ as any
      : this.originalTodos$.merge(this.setTodos$);
  }

  addItem(item: TodoItem): Observable<TodoItem> {
    return this.http.post('/api/todo', item)
      .map(r => r.json() as TodoItem)
      .combineLatest(this.getTodoList().take(1))
      .do(([newItem, list]) => this.setTodos$.next([...list, item]))
      .map(([newItem]) => newItem);
  }

  updateItem(item: TodoItem, updateItem: Optional<TodoItem>): Observable<TodoItem> {
    return this.http.patch(`/api/todo/${item.id}`, updateItem)
      .map(r => r.json() as TodoItem)
      .combineLatest(this.getTodoList().take(1))
      .do(([newItem, list]) => this.setTodos$.next([
        ...list.map(i => i.id === newItem.id
          ? newItem
          : i)
      ]))
      .map(([newItem]) => newItem);
  }

  removeItem(item: TodoItem): Observable<void> {
    return this.http.delete(`/api/todo/${item.id}`)
      .switchMap(() => this.getTodoList().take(1))
      .do(list => this.setTodos$.next([...list.filter(i => i.id !== item.id)]))
      .map(() => void 0);
  }

}
