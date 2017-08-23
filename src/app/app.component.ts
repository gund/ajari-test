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
      let lastData = route.data;
      while (route.firstChild) {
        lastData = route.data;
        route = route.firstChild;
      }
      return { route, lastData };
    })
    .filter(({ route, lastData }) => route.outlet === 'primary' || !!lastData)
    .mergeMap(({ route, lastData }) => route.data.combineLatest(lastData));

  title$ = this.routerData$
    .map(([data, lastData]) => data['title'] || lastData['title'])
    .map(t => t || this.defaultTitle)
    .do(t => this.title.setTitle(t));

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

}
