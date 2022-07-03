import { Injectable } from '@angular/core';
import { EnvironmentService } from '~shared/services/environment.service';

export enum UserType {
  STUDENT = 'STUD',
  GUEST = 'GUEST'
}

@Injectable({
    providedIn: 'root'
})
export class ListConfigStoreService  {
  constructor () {}
}
