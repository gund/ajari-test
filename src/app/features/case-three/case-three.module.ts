import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BackgroundSyncModule } from '../background-sync/background-sync.module';
import { CaseThreeComponent } from './case-three.component';
import { caseThreeRoutes } from './case-three.routing';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './todo/todo.service';

@NgModule({
  imports: [
    SharedModule,
    caseThreeRoutes,
    BackgroundSyncModule.forRoot(),
  ],
  declarations: [
    CaseThreeComponent,
    TodoComponent,
  ],
  providers: [
    TodoService,
  ],
})
export class CaseThreeModule { }
