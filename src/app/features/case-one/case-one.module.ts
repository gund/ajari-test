import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CaseOneComponent } from './case-one.component';
import { caseOneRoutes } from './case-one.routing';

@NgModule({
  imports: [
    SharedModule,
    caseOneRoutes,
  ],
  declarations: [
    CaseOneComponent,
  ]
})
export class CaseOneModule { }
