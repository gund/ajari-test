import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CaseOneComponent } from './case-one.component';
import { caseOneRoutes } from './case-one.routing';
import { DynamicMenuItemComponent } from './dynamic-menu-item/dynamic-menu-item.component';
import { DynamicMenuComponent } from './dynamic-menu/dynamic-menu.component';
import { DynamicMenuService } from './dynamic-menu/dynamic-menu.service';
import { OverviewComponent } from './overview/overview.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
  imports: [
    SharedModule,
    caseOneRoutes,
  ],
  declarations: [
    CaseOneComponent,
    DynamicMenuComponent,
    DynamicMenuItemComponent,
    ReportsComponent,
    StatisticsComponent,
    OverviewComponent,
    SettingsComponent
  ],
  providers: [
    DynamicMenuService,
  ]
})
export class CaseOneModule { }
