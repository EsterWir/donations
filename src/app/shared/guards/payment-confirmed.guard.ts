import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree  } from '@angular/router';
import { UohPay, UohPayStatus } from '@haifauniversity/ngx-pay';

@Injectable({
  providedIn: 'root'
})
export class PaymentConfirmedGuard implements CanActivate {
  constructor(private router: Router, private pay: UohPay) {}

  canActivate(): boolean | UrlTree {
    if (this.pay.payment.status !== UohPayStatus.Success) {
      return this.router.parseUrl('/');
    }

    return true;
  }
}
