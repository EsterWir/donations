import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '~shared/services/payment/payment.service';
import { UserFormData } from '~shared/types/UserFormData';
import { TranslateService } from '@ngx-translate/core';
import { UserInfoQueryService } from '~shared/services/user-info/user-info-query.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './user-details-form-page.component.html',
  styleUrls: ['./user-details-form-page.component.scss']
})
export class UserDetailsFormPageComponent implements OnInit {

  language : String = '';
  subscription !: Subscription;

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private translate: TranslateService,
    private query: UserInfoQueryService
  ) { }
  lang = this.translate.getDefaultLang();

  ngOnInit(): void { 
    this.language = this.translate.getDefaultLang();
    this.subscription = this.query.changeLanguage
    .subscribe(
      (newLang: String) => {
        this.language  = newLang;
      }
    );

  }

  goToPayment(formData: UserFormData) {
    this.paymentService.attemptPayment(formData).subscribe(response => {
      if (response && response.checkout && response.product) {
        this.router.navigate(['payment']);
      }
    });
  }

  changeLang(lang: string) {
    alert(lang)
    this.translate.use(lang);
  }
}
