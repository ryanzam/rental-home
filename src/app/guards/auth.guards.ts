import { UserAuthService } from './../services/user-auth.service';
import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor( private as:UserAuthService, private router: Router ){

    }

    canActivate(){
        if(this.as.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/signin']);
            return false;
        }
    }
}