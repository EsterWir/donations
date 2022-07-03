import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserInfoQueryService } from '~shared/services/user-info/user-info-query.service';


@Component({
  selector: 'app-languages-select',
  templateUrl: './languages-select.component.html',
  styleUrls: ['./languages-select.component.scss']
})
export class LanguagesSelectComponent {


  constructor(private translate: TranslateService,
    private query: UserInfoQueryService
    ) { }

  get currentLang () {
    return this.translate.currentLang;
  }
  get languages () {
    return this.translate.getLangs();
  }

  changeLang (lang: string) {
    this.translate.use(lang);
    this.query.changeLanguage.next(lang);
  }

  buildKey (lang: string) {
    return `LANG_${lang.toUpperCase()}`;
  }
}
