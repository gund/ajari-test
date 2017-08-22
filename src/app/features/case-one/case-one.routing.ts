import { RouterModule, Routes } from '@angular/router';

import { CaseOneComponent } from './case-one.component';

const routes: Routes = [
  {
    path: '',
    component: CaseOneComponent,
    data: {
      title: 'Dynamic Menu'
    }
  },
];

export const caseOneRoutes = RouterModule.forChild(routes);
