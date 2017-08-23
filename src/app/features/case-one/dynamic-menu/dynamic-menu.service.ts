import { Http } from '@angular/http';
import { DynamicMenu } from './dynamic-menu';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicMenuService {

  constructor(
    private http: Http,
  ) { }

  getMenu(): Observable<DynamicMenu> {
    return this.http.get('/assets/getMenu.json').map(r => r.json());
  }

}
