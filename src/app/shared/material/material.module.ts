import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
} from '@angular/material';

const IMPORT_AND_EXPORT = [
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
];

@NgModule({
  imports: IMPORT_AND_EXPORT,
  exports: IMPORT_AND_EXPORT,
})
export class MaterialModule { }
