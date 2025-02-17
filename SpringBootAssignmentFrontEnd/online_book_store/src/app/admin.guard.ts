import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class AdminGuard implements CanActivate{
  constructor(private router:Router){

  }
  canActivate():boolean{
    if(sessionStorage.getItem('userEmail')==null){
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
  
}
