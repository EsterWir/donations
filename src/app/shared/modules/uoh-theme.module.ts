import { NgModule } from '@angular/core';

import {
  UohAccessibilityModule,
  UohHeaderModule,
  UohFooterModule,
  UohSpinnerModule,
  UohBackToTopModule,
  UohCardModule
} from '@uoh/ngx-theme';

const modules = [
  UohAccessibilityModule,
  UohHeaderModule,
  UohFooterModule,
  UohSpinnerModule,
  UohBackToTopModule,
  UohCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class UohThemeModule {}
