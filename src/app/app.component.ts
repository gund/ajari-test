import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  defaultTitle = 'Ajari Test App';

  routerData$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this.activatedRoute)
    .map(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data);

  title$ = this.routerData$
    .pluck<any, string>('title')
    .map(t => t || this.defaultTitle)
    .do(t => this.title.setTitle(t));

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

}
