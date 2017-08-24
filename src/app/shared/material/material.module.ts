import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdSidenavModule,
  MdToolbarModule,
  MdCheckboxModule,
} from '@angular/material';

const IMPORT_AND_EXPORT = [
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdMenuModule,
  MdCheckboxModule,
];

@NgModule({
  imports: IMPORT_AND_EXPORT,
  exports: IMPORT_AND_EXPORT,
})
export class MaterialModule { }
