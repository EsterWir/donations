import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UohPayFailureModule, UohPayPageModule, UohPaySuccessModule } from '@haifauniversity/ngx-pay';

import { UohThemeModule } from '~shared/modules/uoh-theme.module';
import { MaterialModule } from '~shared/modules/material.module';
import { TranslateModule } from '~shared/modules/translate.module';
import { SharedComponentsModule } from '~shared/modules/shared-components.module';
import { NgxComponentsModule } from '~shared/modules/ngx-components.module';

import { UserDetailsFormPageComponent } from './user-details-form-page/user-details-form-page.component';

@NgModule({
  declarations: [
    UserDetailsFormPageComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    UohThemeModule,
    NgxComponentsModule,
    SharedComponentsModule,
    UohPayPageModule,
    UohPayFailureModule,
    UohPaySuccessModule
  ]
})
export class PagesModule {}
