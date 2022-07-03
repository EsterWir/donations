import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TranslateLoader, TranslateModule as NgxTranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  imports: [
    NgxTranslateModule.forRoot({
        defaultLanguage: 'he',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [ HttpClient ]
        }
    })
  ],
  exports: [ NgxTranslateModule ]
})
export class TranslateModule {}
