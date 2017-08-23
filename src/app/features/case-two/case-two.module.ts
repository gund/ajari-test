import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AccessManagerService } from './access-manager/access-manager.service';
import { CaseTwoComponent } from './case-two.component';
import { caseTwoRoutes } from './case-two.routing';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    SharedModule,
    caseTwoRoutes,
  ],
  declarations: [
    CaseTwoComponent,
  ],
  providers: [
    AccessManagerService,
    UserService,
  ]
})
export class CaseTwoModule { }
