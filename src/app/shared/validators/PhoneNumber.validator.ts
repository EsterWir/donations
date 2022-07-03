import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if(!control.value || /^[-+\d ]{8,30}$/.test(control.value)) {
      return null;
    }
    return {phoneInvalid: true};
  };
}
