import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Role } from './access-manager';

@Injectable()
export class AccessManagerService {

  static ROLES: Role[] = [
    { id: 1, name: 'Guest', permissions: { canAccess: false, canModify: false } },
    { id: 2, name: 'User', permissions: { canAccess: true, canModify: false } },
    { id: 3, name: 'Manager', permissions: { canAccess: true, canModify: true } },
  ];

  private roles$ = Observable.of(AccessManagerService.ROLES).delay(1000).publishLast().refCount();

  constructor() { }

  getRoles(): Observable<Role[]> {
    return this.roles$;
  }

  canAccess(role: Role) {
    return this.getRoles()
      .map(roles => !!roles
        .filter(r => r.id === role.id)
        .map(r => r.permissions.canAccess)
        .shift());
  }

  canModify(role: Role) {
    return this.getRoles()
      .map(roles => !!roles
        .filter(r => r.id === role.id)
        .map(r => r.permissions.canModify)
        .shift());
  }

}
