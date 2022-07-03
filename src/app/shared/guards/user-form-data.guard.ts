import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree  } from '@angular/router';
import { PaymentStoreService } from '~shared/services/payment/payment-store.service';

@Injectable({
  providedIn: 'root'
})
export class UserFormDataGuard implements CanActivate {
    constructor(
      private router: Router,
      private paymentStore: PaymentStoreService
    ) {}
  
    canActivate(): boolean | UrlTree {
      const {
        userId,
        firstName,
        lastName,
        phone,
        email,
        amount
      } = this.paymentStore.getFormData() || {};

      if (userId && firstName && lastName && phone && email && amount) return true;

      return this.router.parseUrl('/');
    }
}
