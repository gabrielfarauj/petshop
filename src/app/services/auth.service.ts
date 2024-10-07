import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityUtil } from '../utils/security.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    
   }

  canActivate(): boolean{
    if(SecurityUtil.hasUser()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
