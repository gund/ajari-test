import { Component } from '@angular/core';

import { DynamicMenuService } from './dynamic-menu/dynamic-menu.service';

@Component({
  selector: 'app-case-one',
  templateUrl: './case-one.component.html',
  styleUrls: ['./case-one.component.scss']
})
export class CaseOneComponent {

  menu$ = this.dynamicMenuService.getMenu();

  constructor(
    private dynamicMenuService: DynamicMenuService,
  ) { }

}
