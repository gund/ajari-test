import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MdCheckboxChange } from '@angular/material';

import { TodoItem } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  @Input() items: TodoItem[];

  @Output() onRemove = new EventEmitter<TodoItem>();
  @Output() onCheck = new EventEmitter<TodoItem>();
  @Output() onUncheck = new EventEmitter<TodoItem>();

  itemUpdated(item: TodoItem, change: MdCheckboxChange) {
    if (change.checked) {
      this.onCheck.emit(item);
    } else {
      this.onUncheck.emit(item);
    }
  }

}
