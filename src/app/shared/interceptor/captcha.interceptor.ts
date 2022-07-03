import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CaptchaService } from '~shared/services/captcha.service';

@Injectable()
export class CaptchaInterceptor implements HttpInterceptor {
  static RECAPTCHA_RESPONSE_HEADER = 'Uoh-reCaptcha-Response';
  static SHOULD_VALIDATE_RECAPTCHA_HEADER = 'Uoh-Interceptor-Captcha-Should-Validate-reCaptcha';
  
  /**
   * ApiInterceptor constructor
   * 
   * @param injector 
   */
  constructor (private injector: Injector) {}

  /**
   * Get injected UohSpinner
   */
  get captchaService () {
    return this.injector.get(CaptchaService);
  }

  /**
   * 
   * @param request
   * @param next
   * @returns {Ovservable<any>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const headers = request.headers;
    const shouldValidate = headers.get(CaptchaInterceptor.SHOULD_VALIDATE_RECAPTCHA_HEADER);

    if (shouldValidate != 'true') {
      return next.handle(request.clone());
    }

    const reCaptchaResponse = this.captchaService.getResponse() || '';

    return (
      next.handle(request.clone({ setHeaders: {
        [CaptchaInterceptor.RECAPTCHA_RESPONSE_HEADER]: reCaptchaResponse
      }}))
    );
  }
}