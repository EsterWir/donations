import { Injectable } from '@angular/core';
import { Checkout } from '~shared/types/Checkout';
import { Product } from '~shared/types/Product';
import { UserFormData } from '~shared/types/UserFormData';

@Injectable({
    providedIn: 'root'
})
export class PaymentStoreService {
  private productData: Product | null = null;
  private checkoutData: Checkout | null = null;
  private formData: UserFormData | null = null;
  private paymentCompleted: boolean = false;
  
  setProductData (productData: Product) {
    this.productData = productData;
  }
  
  getProductData (): Product | null {
    return this.productData;
  }
  
  setCheckoutData (checkoutData: Checkout) {
    this.checkoutData = checkoutData;
  }
  
  getCheckoutData (): Checkout | null {
    return this.checkoutData;
  }
  
  setFormData (formData: UserFormData) {
    this.formData = formData;
  }
  
  getFormData (): UserFormData | null {
    return this.formData;
  }

  completePayment () {
    this.paymentCompleted = true;
  }

  isPaymentCompleted () {
    return this.paymentCompleted;
  }
}