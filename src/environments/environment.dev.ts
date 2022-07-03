import { environment as defaults, Environment } from './environment.defaults';

export const environment: Environment = {
  ...defaults,
  production: false,
  authMethod: 'CAPTCHA'
};
