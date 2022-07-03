import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UohPayment, UohPayStatus, UOH_PAY_TYPE_NAME_HE } from '@haifauniversity/ngx-pay';
import { UohLogger } from '@haifauniversity/ngx-tools';

@Component({
  selector: 'pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.scss'],
})
export class PaySuccessComponent implements OnInit {
  @HostBinding('class') class = 'uoh-pay-success';
  @Input() payment: UohPayment = {
    status: UohPayStatus.Pending
  };

  constructor(private logger: UohLogger) {}

  get paymentMethodMsgKey () {
    return this.payment.type ? `PAY_SUCCESS_${this.payment.type.toUpperCase()}` : '';
  }

  ngOnInit(): void {
    this.logger.info('[PaySuccessComponent.ngOnInit] Payment success:', JSON.stringify(this.payment));
  }
}