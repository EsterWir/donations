import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserInfoStoreService, UserType } from './user-info-store.service';


@Injectable({
    providedIn: 'root'
})
export class UserInfoService {
  private status = new BehaviorSubject(false) as BehaviorSubject<boolean>;
  public status$ = this.status.asObservable();


  constructor (
    private store: UserInfoStoreService
  ) {}

  isStudent () {
    return this.store.type === UserType.STUDENT;
  }

  isGuest () {
    return this.store.type === UserType.GUEST;
  }
}