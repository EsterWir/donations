import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { phoneNumberValidator } from '~shared/validators/PhoneNumber.validator';
import { ListsConfigService } from '~shared/services/lists-config/list-config-config.service';
import { TranslateService } from '@ngx-translate/core';
import { EnvironmentService } from '~shared/services/environment.service';
import { CaptchaService } from '~shared/services/captcha.service';
import { UserFormData } from '~shared/types/UserFormData';
import { UserInfoQueryService } from '~shared/services/user-info/user-info-query.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})


export class UserDetailsFormComponent implements OnInit {
  ifShowOtherAmountFeild = false
  listTitles: Title[] = [
    { key: 'MR', value: '' },
    { key: 'MS', value: '' },
    { key: 'DR', value: '' },
    { key: 'PROF', value: '' },
  ];
  coinsList: Coin[] = [
    { key: 'USD', value: '' },
    { key: 'EUR', value: '' },
    { key: 'NIS', value: '' },
  ];
  designationsList: Designation[] = [
    { key: 'a', value: '' },
    { key: 'b', value: '' },
    { key: 'C', value: '' }

  ]
  labelPosition: 'before' | 'after' = 'before';
  language: String = '';
  subscription !: Subscription;


  @Output() onSubmit = new EventEmitter<UserFormData>();

  formGroup = new FormGroup({
    title: new FormControl(null, [
    ]),
    fullName: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[א-תa-zA-Z\\-\\\' ]*$')
    ]),
    address: new FormControl(null, [
    ]),
    country: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[א-תa-zA-Z\\-\\\' ]*$')
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    phone: new FormControl(null, [
      Validators.required,
      phoneNumberValidator()
    ]),
    giftAmount: new FormControl(null, [
    ]),
    currency: new FormControl(null, [
      Validators.required
    ]),
    designateSupport: new FormControl(null, [
    ]),
    donationDetails: new FormControl(null, []),
    anonymous: new FormControl(null, []),
    nameOf: new FormControl(null, []),
    consent: new FormControl(null, [])
  });

  get fullNameControl() { return this.formGroup.get('userfullName'); }
  get emailControl() { return this.formGroup.get('email'); }
  get phoneControl() { return this.formGroup.get('phone'); }
  get reCaptchaSiteKey() { return this.env.getReCaptchaSiteKey(); }
  constructor(
    public listsConfigService: ListsConfigService,
    private translate: TranslateService,
    private captcha: CaptchaService,
    private env: EnvironmentService,
    private query: UserInfoQueryService

  ) { }
  ngOnInit() {
    this.buildCoinsList();
    this.buildTitlesList();
    this.language = this.translate.getDefaultLang();
    this.formGroup.controls['currency'].setValue(this.language == 'he' ? "NIS" : "USD");
    this.subscription = this.query.changeLanguage
      .subscribe(
        (newLang: String) => {
          this.language = newLang;
          this.buildTitlesList();
          this.buildCoinsList();
          this.formGroup.controls['currency'].setValue(this.language == 'he' ? "NIS" : "USD");
        }
      );
  }

  hasError(control: AbstractControl | null) {
    return control?.invalid && (control?.dirty || control?.touched);
  }
  buildTitlesList() {
    this.translate.get(['MR_TITLE', 'MS_TITLE', 'DR_TITLE', 'PROF_TITLE']).subscribe((text: string) => {
      this.listTitles[0].value = text['MR_TITLE' as any]
      this.listTitles[1].value = text['MS_TITLE' as any]
      this.listTitles[2].value = text['DR_TITLE' as any]
      this.listTitles[3].value = text['PROF_TITLE' as any]
    });
  }
  buildCoinsList() {
    this.translate.get(['USD_CURRENCY', 'EURO_CURRENCY', 'NIS_CURRENCY']).subscribe((text: string) => {
      this.coinsList[0].value = text['USD_CURRENCY' as any]
      this.coinsList[1].value = text['EURO_CURRENCY' as any]
      this.coinsList[2].value = text['NIS_CURRENCY' as any]
    });
  }
  buildDesignationsList() {
    this.translate.get(['USD_CURRENCY', 'EURO_CURRENCY', 'NIS_CURRENCY']).subscribe((text: string) => {
      this.coinsList[0].value = text['USD_CURRENCY' as any]
      this.coinsList[1].value = text['EURO_CURRENCY' as any]
      this.coinsList[2].value = text['NIS_CURRENCY' as any]
    });
  }
  reCaptchaResolved(response: string) {
    if (!!response) {
      this.captcha.resolve(response);
    }
  }
  handleSubmit() {
    if (this.captcha.isResolved()) {
      const data = this.formGroup.getRawValue() as UserFormData;
      this.onSubmit.emit(data);
    }
  }
  showOtherAmountFeild() {
    this.ifShowOtherAmountFeild = true;

  }
}

export class Coin {
  key: string = '';
  value: string = '';
}
export class Title {
  key: string = '';
  value: string = '';
}
export class Designation {
  key: string = '';
  value: string = '';
}
