import { ModuleWithProviders, NgModule } from '@angular/core';

import { BackgroundSyncService } from './background-sync.service';

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
      ]
    };
  }

}
