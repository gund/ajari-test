import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './features/home/home.module.ts#HomeModule',
    pathMatch: 'full',
  },
  {
    path: 'case-one',
    loadChildren: './features/case-one/case-one.module.ts#CaseOneModule',
  },
  {
    path: 'case-two',
    loadChildren: './features/case-two/case-two.module.ts#CaseTwoModule',
  },
  {
    path: 'case-three',
    loadChildren: './features/case-three/case-three.module.ts#CaseThreeModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
