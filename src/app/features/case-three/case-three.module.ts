import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CaseThreeComponent } from './case-three.component';
import { caseThreeRoutes } from './case-three.routing';

@NgModule({
  imports: [
    SharedModule,
    caseThreeRoutes,
  ],
  declarations: [
    CaseThreeComponent,
  ],
})
export class CaseThreeModule { }
