import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';

const IMPORT_AND_EXPORT = [
  CommonModule,
  MaterialModule,
];

const DECLARE_AND_EXPORT: any[] = [
];

@NgModule({
  declarations: [
    DECLARE_AND_EXPORT,
  ],
  imports: [
    IMPORT_AND_EXPORT,
  ],
  exports: [
    IMPORT_AND_EXPORT,
    DECLARE_AND_EXPORT,
  ],
})
export class SharedModule { }
