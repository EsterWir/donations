import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree  } from '@angular/router';
import { CaptchaService } from '~shared/services/captcha.service';
import { UserInfoService } from '~shared/services/user-info/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class CaptchaGuard implements CanActivate {
    constructor(
      private router: Router,
      private userInfo: UserInfoService,
      private captcha: CaptchaService
    ) {}
  
    canActivate(): boolean | UrlTree {
      if (this.userInfo.isGuest() && !this.captcha.isResolved()) {
        return this.router.parseUrl('/');
      }
  
      return true;
    }
}
