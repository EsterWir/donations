import { Injectable } from '@angular/core';
import {
  UohErrorHandlingInterceptor,
  UohLogRequestsInterceptor,
  UohMockRequestInterceptor,
  UohOriginUrlInterceptor
} from '@haifauniversity/ngx-tools';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerInterceptor } from '~shared/interceptor/spinner.interceptor';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoQueryService {
  readonly label = 'USER_INFO';
  private readonly URL = '/student/api/user';
  changeLanguage = new Subject<String>();

  private readonly HEADERS = {
    [SpinnerInterceptor.SHOULD_SPIN_HEADER]: 'true',
    [UohOriginUrlInterceptor.SHOULD_USE_ORIGIN_URL_HEADER]: 'true',
    [UohLogRequestsInterceptor.SHOULD_LOG_REQUEST_HEADER]: 'true',
    [UohErrorHandlingInterceptor.SHOULD_HANDLE_HEADER]: 'true',
    [UohErrorHandlingInterceptor.LABEL_HEADER]: this.label,
    [UohMockRequestInterceptor.DUMMY_DATA_PATH_HEADER]: 'assets/dummyData/userInfo.json'
  };

  constructor(private translate: TranslateService) { }

}