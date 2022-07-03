import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UohHeaderUser } from '@uoh/ngx-theme';
import { UohPay } from '@haifauniversity/ngx-pay';
import { UohLogger, UohPlatform } from '@haifauniversity/ngx-tools';
import { EnvironmentService } from './shared/services/environment.service';
import { UserInfoService } from './shared/services/user-info/user-info.service';
import { UserInfoStoreService } from './shared/services/user-info/user-info-store.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  version: string;
  direction: Direction = 'rtl';
  private subscription = new Subscription();

  constructor (
    private env: EnvironmentService,
    private translate: TranslateService,
    private platform: UohPlatform,
    private logger: UohLogger,
    private pay: UohPay,
    private userInfo: UserInfoService,
    private userInfoStore: UserInfoStoreService
  ) {
    this.version = this.env.getVersion();
    this.translate.addLangs(this.env.getLanguages());
    this.translate.setDefaultLang(this.env.getLocale());
    this.translate.use(this.env.getLocale());
  }

  get user (): UohHeaderUser {
    let name = this.userInfoStore.englishName;

    if (this.lang === this.env.getLocale()) {
      name = `${this.userInfoStore.firstName} ${this.userInfoStore.lastName}`
    }

    return { name };
  }

  get lang (): string {
    return this.translate.currentLang;
  }
  
  ngOnInit () {
    this.pay.reset();

    this.subscribeLangChange();

    if (this.userInfo.isStudent()) {
      this.login();
    }
    
    this.logger.debug(this.platform.getInfo());
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  subscribeLangChange () {
    this.subscription.add(
      this.translate.onLangChange.subscribe(({ lang }) => {
        window.setTimeout(() => {
          if (this.env.getForeignLocale().indexOf(lang)>-1 ) {
            this.direction = 'ltr';
          } else {
            this.direction = 'rtl';
          }
        }, 100);
      })
    );
  }

  login () {
    this.subscription.add(
    );
  }

  logout () {
    window.location.href = `${this.env.getOriginUrl()}/logout`; 
  }

  isStudent () {
    return this.userInfo.isStudent();
  }
}
