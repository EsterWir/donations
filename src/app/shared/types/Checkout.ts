import { UohPayCurrency, UohPayType } from "@haifauniversity/ngx-pay";

export interface Checkout {
  token: string;
  terminal: string;
  amount: number;
  sum: number;
  payType: UohPayType;
  currency: UohPayCurrency;
  maxInstallments: number;
}