import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Role } from '../access-manager/access-manager';
import { AccessManagerService } from '../access-manager/access-manager.service';

@Injectable()
export class UserService {

  name = '';
  role: Role = {} as any;
  isAuthorized = false;

  private setCanAccess$ = new Subject<Role>();
  private setCanModify$ = new Subject<Role>();

  canAccess$ = this.setCanAccess$
    .mergeMap(role => this.am.canAccess(role))
    .publishBehavior(false).refCount();

  canModify$ = this.setCanModify$
    .mergeMap(role => this.am.canModify(role))
    .publishBehavior(false).refCount();

  constructor(
    private am: AccessManagerService,
  ) { }

  authenticateAs(name: string, role: Role) {
    this.name = name;
    this.role = role;
    this.isAuthorized = true;

    this.setCanAccess$.next(role);
    this.setCanModify$.next(role);
  }

  logout() {
    this.name = '';
    this.role = {} as any;
    this.isAuthorized = false;

    this.setCanAccess$.next({} as any);
    this.setCanModify$.next({} as any);
  }

}
