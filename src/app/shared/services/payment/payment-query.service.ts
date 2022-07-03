import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  UohErrorHandlingInterceptor,
  UohLogRequestsInterceptor,
  UohMockRequestInterceptor,
  UohOriginUrlInterceptor
} from '@haifauniversity/ngx-tools';

import { SpinnerInterceptor } from '~shared/interceptor/spinner.interceptor';
import { CaptchaInterceptor } from '~shared/interceptor/captcha.interceptor';
import { UserFormData } from '~shared/types/UserFormData';
import { Checkout } from '~shared/types/Checkout';
import { Product } from '~shared/types/Product';

export interface PostPaymentAttemptRequestBody {
  platform: string;
  userFormData: UserFormData;
}

export interface PostPaymentAttemptResponse {
  product: Product;
  checkout: Checkout;
}

export interface PostPaymentCompleteRequestBody {
  token: string;
}

export interface PostPaymentCompleteResponse {
  status: 'OK' | 'PARTIAL';
}

@Injectable({
    providedIn: 'root'
})
export class PaymentQueryService {
  readonly label = 'PAYMENT';
  private readonly ATTEMPT_URL = '/api/payment/attempt';
  private readonly COMPLETE_URL = '/api/payment/complete';
  private readonly HEADERS = {
    [SpinnerInterceptor.SHOULD_SPIN_HEADER]: 'true',
    [CaptchaInterceptor.SHOULD_VALIDATE_RECAPTCHA_HEADER]: 'true',
    [UohOriginUrlInterceptor.SHOULD_USE_ORIGIN_URL_HEADER]: 'true',
    [UohLogRequestsInterceptor.SHOULD_LOG_REQUEST_HEADER]: 'true',
    [UohErrorHandlingInterceptor.SHOULD_HANDLE_HEADER]: 'true',
    [UohErrorHandlingInterceptor.LABEL_HEADER]: this.label,
    [UohErrorHandlingInterceptor.DEFAULT_RESPONSE_HEADER]: JSON.stringify({})
  };

  constructor (private http: HttpClient) {}

  postAttempt (body: PostPaymentAttemptRequestBody): Observable<any> {
    return this.http.post<PostPaymentAttemptResponse>(this.ATTEMPT_URL, body, { headers: this.HEADERS });
  }

  postComplete (body: PostPaymentCompleteRequestBody): Observable<any> {
    return this.http.post<PostPaymentCompleteResponse>(this.COMPLETE_URL, body, { headers: this.HEADERS });
  }
}