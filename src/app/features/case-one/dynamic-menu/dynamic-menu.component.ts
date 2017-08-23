import { Component, Input, OnInit } from '@angular/core';

import { DynamicMenu } from './dynamic-menu';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})
export class DynamicMenuComponent implements OnInit {

  @Input() menu: DynamicMenu;

  constructor() { }

  ngOnInit() {
  }

}
