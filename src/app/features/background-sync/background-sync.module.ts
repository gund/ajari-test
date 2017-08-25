import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';

import { BackgroundHttpService } from './background-http.service';
import { BackgroundSyncService } from './background-sync.service';

export function bgHttpFactory(backend: any, opts: any, bgSync: any) {
  return new BackgroundHttpService(backend, opts, bgSync);
}

@NgModule({
  imports: [],
  declarations: [],
})
export class BackgroundSyncModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BackgroundSyncModule,
      providers: [
        BackgroundSyncService,
        {
          provide: BackgroundHttpService,
          useFactory: bgHttpFactory,
          deps: [XHRBackend, RequestOptions, BackgroundSyncService],
        },
      ]
    };
  }

}
