import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  formValidation(user){
    if (user.name == undefined || user.phone == undefined || 
      user.email == undefined || user.password == undefined){
        return false;
      }
      else {
        return true;
      }    
  }

  emailValidation(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
