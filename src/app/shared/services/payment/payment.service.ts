import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UohPlatform } from '@haifauniversity/ngx-tools';
import { PaymentQueryService, PostPaymentAttemptRequestBody, PostPaymentAttemptResponse, PostPaymentCompleteResponse } from './payment-query.service';
import { PaymentStoreService } from './payment-store.service';
import { UohPay } from '@haifauniversity/ngx-pay';
import { UserFormData } from '~shared/types/UserFormData';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(
    private platform: UohPlatform,
    private pay: UohPay,
    private query: PaymentQueryService,
    private store: PaymentStoreService
  ) {}

  get payment$ () {
    return this.pay.payment$;
  }

  isValidPayment (): boolean {
    return !!this.pay.payment.status && !!this.pay.payment.receivedAt && !!this.pay.payment.confirmationCode;
  }

  attemptPayment (userFormData: UserFormData): Observable<PostPaymentAttemptResponse> {
    const body: PostPaymentAttemptRequestBody = {
      platform: this.platform.getInfo(),
      userFormData
    };

    return this.query.postAttempt(body).pipe(
      tap(data => {
        this.store.setProductData(data.product);
        this.store.setCheckoutData(data.checkout);
        this.store.setFormData(userFormData);
      })
    );
  }

  completePayment (): Observable<PostPaymentCompleteResponse> {
    const token = this.store.getCheckoutData()?.token || "";

    return this.query.postComplete({ token }).pipe(
      tap(({ status }) => {
        if (status === 'OK' || status === 'PARTIAL') {
          this.store.completePayment();
        }
      })
    );
  }
}