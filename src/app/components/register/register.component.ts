import { UserAuthService } from './../../services/user-auth.service';
import { ValidationService } from './../../services/validation.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  phone: Number;
  email: String;
  password: String;

  constructor(private vs: ValidationService, private fms: FlashMessagesService, 
    private ua:UserAuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    const user = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password
    }
    if(!this.vs.formValidation(user)){
      this.fms.show("Missing fields, Please fill all fields", {cssClass: "alert-danger", timeout:2000});
      return false;
    }
    if(!this.vs.emailValidation(user.email)){
      this.fms.show("Please use a correct email!!", {cssClass: "alert-danger", timeout:2000});
      return false;
    }

    this.ua.userRegisteration(user).subscribe(data=> {
      if(data){
        this.fms.show("Successfully Registered! You can sign in now.", {cssClass: "alert-success", timeout:3000});
        this.router.navigate(['/signin']);
      } else {
        this.fms.show("Oppss!! Something went wrong, Please try later!!", {cssClass: "alert-success", timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
