import { RouterModule, Routes } from '@angular/router';

import { CaseTwoComponent } from './case-two.component';

const routes: Routes = [
  {
    path: '',
    component: CaseTwoComponent,
    data: {
      title: 'Permission Management'
    },
  },
];

export const caseTwoRoutes = RouterModule.forChild(routes);
