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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
