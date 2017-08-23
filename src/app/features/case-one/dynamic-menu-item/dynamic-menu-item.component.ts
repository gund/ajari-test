import { Component, Input } from '@angular/core';

import { DynamicMenuItem } from '../dynamic-menu/dynamic-menu';

@Component({
  selector: 'app-dynamic-menu-item',
  templateUrl: './dynamic-menu-item.component.html',
  styleUrls: ['./dynamic-menu-item.component.scss']
})
export class DynamicMenuItemComponent {

  @Input() menu: DynamicMenuItem;
  @Input() parentLink: string[] = [];

  get hasChildren() {
    return !!(this.menu.children && this.menu.children.length);
  }

  get linkUrl() {
    return this.menu.link
      ? [...this.parentLink, this.menu.link]
      : this.parentLink;
  }

  showChildren = true;

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }

}
