import { ValidationService } from './../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: String;
  password: String;
  constructor(private as: UserAuthService, private router:Router, private fms:FlashMessagesService, private validServ:ValidationService) { }

  ngOnInit() {
  }

  onSigninSubmit() {
    let user={
      email: this.email,
      password: this.password
    }

    if(!this.validServ.emailValidation(user.email)){
      this.fms.show("Please use a correct email!!", {cssClass: "alert-danger", timeout:2000});
      return false;
    }

    this.as.userSignIn(user).subscribe(data=>{
      if(data.success == true){
        this.as.storeData(data.token, data.user);
        this.fms.show("You have signed in now", {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['dashboard']);

      } else {
        this.fms.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });
  }

}
