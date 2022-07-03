import { UohPayModule } from '@haifauniversity/ngx-pay';
import { UohRequestModule } from '@haifauniversity/ngx-tools';
import { environment as defaults, Environment } from './environment.defaults';

export const environment: Environment = {
  ...defaults,
  production: true,
  authMethod: 'CAPTCHA',
  payModule: UohPayModule.forRoot(),
  requestModule: UohRequestModule.forRoot({ originUrl: '/donations' })
};
