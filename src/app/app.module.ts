import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UohPlatformModule } from '@haifauniversity/ngx-tools';
import { environment } from '../environments/environment';
import { PagesModule } from './pages/pages.module';
import { TranslateModule } from './shared/modules/translate.module';
import { MaterialModule } from './shared/modules/material.module';
import { UohThemeModule } from './shared/modules/uoh-theme.module';
import { SpinnerInterceptor } from './shared/interceptor/spinner.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CaptchaInterceptor } from './shared/interceptor/captcha.interceptor';
import { SharedComponentsModule } from './shared/modules/shared-components.module';
import { TranslateLoader} from '@ngx-translate/core';


@NgModule({
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    MaterialModule,
    SharedComponentsModule,
    UohThemeModule,
    UohPlatformModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PagesModule,
    AppRoutingModule,
    environment.requestModule,
    environment.loggerModule,
    environment.payModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CaptchaInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
