import { RouterModule, Routes } from '@angular/router';

import { CaseThreeComponent } from './case-three.component';

const routes: Routes = [
  {
    path: '',
    component: CaseThreeComponent,
    data: {
      title: 'Background Sync'
    },
  },
];

export const caseThreeRoutes = RouterModule.forChild(routes);
