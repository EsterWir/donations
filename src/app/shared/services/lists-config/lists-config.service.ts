import { Injectable } from '@angular/core';

import {
  UohErrorHandlingInterceptor,
  UohLogRequestsInterceptor,
  UohOriginUrlInterceptor
} from '@haifauniversity/ngx-tools';

import { SpinnerInterceptor } from '~shared/interceptor/spinner.interceptor';
export interface discountResponse {
  discountPercent: number, message: string
}


export interface CoursesApiResponse {
}

@Injectable({
  providedIn: 'root'
})
export class CoursesQueryService {
  readonly label = 'COURSES';
  private readonly URL_COURSES = '/api/coursess';
  private readonly URL_DISCOUNT = 'api/discount/';
  private readonly HEADERS = {
    [SpinnerInterceptor.SHOULD_SPIN_HEADER]: 'true',
    [UohOriginUrlInterceptor.SHOULD_USE_ORIGIN_URL_HEADER]: 'true',
    [UohLogRequestsInterceptor.SHOULD_LOG_REQUEST_HEADER]: 'true',
    [UohErrorHandlingInterceptor.SHOULD_HANDLE_HEADER]: 'true',
    [UohErrorHandlingInterceptor.LABEL_HEADER]: this.label
  };

  constructor() { }

}