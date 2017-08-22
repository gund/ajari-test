import { NgModule } from '@angular/core';
import { MdButtonModule, MdCardModule, MdListModule, MdToolbarModule } from '@angular/material';

const IMPORT_AND_EXPORT = [
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdListModule,
];

@NgModule({
  imports: IMPORT_AND_EXPORT,
  exports: IMPORT_AND_EXPORT,
})
export class MaterialModule { }
