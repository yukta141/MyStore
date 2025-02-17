import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})
export class UserGuard implements CanActivate{
  constructor(private router:Router){

  }
  canActivate():boolean{
    if(sessionStorage.getItem('userEmail')==null){
      // console.log("fygjygjhguit",sessionStorage.getItem('userEmail'));
      
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
  
}
