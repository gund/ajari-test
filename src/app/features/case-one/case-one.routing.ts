import { RouterModule, Routes } from '@angular/router';

import { CaseOneComponent } from './case-one.component';
import { OverviewComponent } from './overview/overview.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: '',
    component: CaseOneComponent,
    data: {
      title: 'Dynamic Menu'
    },
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
];

export const caseOneRoutes = RouterModule.forChild(routes);
