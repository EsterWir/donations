import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UohSpinner } from '@uoh/ngx-theme';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  static SHOULD_SPIN_HEADER = 'Interceptor-Spinner-Should-Spin';
  
  /**
   * ApiInterceptor constructor
   * 
   * @param injector 
   */
  constructor (private injector: Injector) {}

  /**
   * Get injected UohSpinner
   */
  get spinner () {
    return this.injector.get(UohSpinner);
  }

  /**
   * 
   * @param request
   * @param next
   * @returns {Ovservable<any>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const clone = request.clone();
    const headers = clone.headers;
    const shouldSpin = headers.get(SpinnerInterceptor.SHOULD_SPIN_HEADER);

    if (shouldSpin === 'true') {
      this.spinner.add();
    }

    return (
      next.handle(clone)
      .pipe(
        finalize(() => {
          if (shouldSpin === 'true') {
            this.spinner.remove();
          }
        })
      )
    );
  }
}