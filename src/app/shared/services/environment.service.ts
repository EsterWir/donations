import { Inject, Injectable } from '@angular/core';
import { UOH_MOCK_REQUESTS, UOH_ORIGIN_URL } from '@haifauniversity/ngx-tools';
import { environment } from '~environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {
    constructor (
      @Inject(UOH_ORIGIN_URL) private originUrl: string = '',
      @Inject(UOH_MOCK_REQUESTS) private mockRequests: boolean = false
    ) {}

    getVersion () {
      return this.getProperties().version;
    }
    
    getLocale () {
      return this.getProperties().locale;
    }
    
    getForeignLocale () {
      return this.getProperties().foreignLocale;
    }
    
    getLanguages () {
      return this.getProperties().languages;
    }

    getAuthMethod () {
      return this.getProperties().authMethod;
    }

    getReCaptchaSiteKey () {
      return this.getProperties().reCaptchaSiteKey;
    }

    shouldMockRequests () {
      return this.mockRequests === true;
    }

    getOriginUrl () {
      return this.originUrl;
    }

    getProperties () {
      return environment;
    }
}
