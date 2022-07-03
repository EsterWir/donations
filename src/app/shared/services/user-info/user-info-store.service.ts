import { Injectable } from '@angular/core';
import { UserInfo } from '~shared/types/UserInfo';
import { EnvironmentService } from '~shared/services/environment.service';

export enum UserType {
  STUDENT = 'STUD',
  GUEST = 'GUEST'
}

@Injectable({
    providedIn: 'root'
})
export class UserInfoStoreService implements UserInfo {
  private _id: string = '';
  private _objectId: string = '';
  private _englishName: string = '';
  private _firstName: string = '';
  private _lastName: string = '';
  private _phone: string = '';
  private _email: string = '';

  constructor (private env: EnvironmentService) {}

  setUserInfo ({
    id,
    objectId,
    englishName,
    firstName,
    lastName,
    phone,
    email
  }: UserInfo) {
    this._id = id;
    this._objectId = objectId;
    this._englishName = englishName;
    this._firstName = firstName;
    this._lastName = lastName;
    this._phone = phone;
    this._email = email;
  }

  get id (): string {
    return this._id;
  }

  get objectId (): string {
    return this._objectId;
  }

  get englishName (): string {
    return this._englishName;
  }

  get firstName (): string {
    return this._firstName;
  }

  get lastName (): string {
    return this._lastName;
  }

  get phone (): string {
    return this._phone;
  }

  get email (): string {
    return this._email;
  }

  get type (): UserType {
    return this.env.getAuthMethod() === 'CAPTCHA' ? UserType.GUEST : UserType.STUDENT;
  }
}
