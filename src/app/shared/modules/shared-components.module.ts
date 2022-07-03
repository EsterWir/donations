import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ErrorComponent } from '~shared/components/error/error.component';
import { FailedComponent } from '~shared/components/failed/failed.component';
import { SuccessComponent } from '~shared/components/success/success.component';
import { UserDetailsFormComponent } from '~shared/components/user-details-form/user-details-form.component';
import { LanguagesSelectComponent } from '~shared/components/languages-select/languages-select.component';
import { AmountInfoDialogComponent } from '~shared/components/amount-info-dialog/amount-info-dialog.component';
import { PaySuccessComponent } from '~shared/components/pay-success/pay-success.component';
import { MaterialModule } from './material.module';
import { UohThemeModule } from './uoh-theme.module';

export const components = [
  ErrorComponent,
  SuccessComponent,
  FailedComponent,
  UserDetailsFormComponent,
  LanguagesSelectComponent,
  AmountInfoDialogComponent,
  PaySuccessComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MaterialModule,
    UohThemeModule,
  ]
})
export class SharedComponentsModule {}
