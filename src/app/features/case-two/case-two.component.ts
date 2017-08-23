import { Role } from './access-manager/access-manager';
import { Component, OnInit } from '@angular/core';

import { AccessManagerService } from './access-manager/access-manager.service';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-case-two',
  templateUrl: './case-two.component.html',
  styleUrls: ['./case-two.component.scss']
})
export class CaseTwoComponent implements OnInit {

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  roles$ = this.am.getRoles();

  get name() {
    return this.userService.name || '[unknown]';
  }

  get authorized() {
    return this.userService.isAuthorized;
  }

  constructor(
    public am: AccessManagerService,
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  loginAs(role: Role) {
    this.userService.authenticateAs(role.name, role);
  }

}
