import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  private response: string | null = null;

  resolve (response: string) {
    this.response = response;
  }

  getResponse () {
    return this.response;
  }

  isResolved () {
    return !!this.response;
  }
}
