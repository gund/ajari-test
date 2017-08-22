import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  defaultTitle = 'Ajari Test App';

  data$ = this.activeRoute.data.do(console.log);
  title$ = this.data$.pluck('title').map(t => t || this.defaultTitle);

  constructor(
    private activeRoute: ActivatedRoute,
  ) {}

}
