import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService {

  authToken: any;
  user: any;

  constructor(private http:Http) { }

  userRegisteration(user){
    let header = new Headers();
    header.append('Authorization', this.authToken);
    header.append('Content-Type', 'application/json'); 
    return this.http.get('http://localhost:3000/user/account', {headers: header})
      .map(res => res.json());
  }

  userSignIn(user) {
    let header = new Headers();
    header.append('Content-Type', 'application/json'); 
    return this.http.post('http://localhost:3000/user/authenticate', user, {headers: header})
      .map(res => res.json());
  }

  userAccount(){
    let header = new Headers();
    this.getToken();
    header.append('Authorization', this.authToken);
    header.append('Content-Type', 'application/json'); 
    return this.http.get('http://localhost:3000/user/account', {headers: header})
      .map(res => res.json());
  }

  storeData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken =token;
    this.user = user;
  }

  getToken(){
    const token = localStorage.getItem('id_token');
    this.authToken =token;
  }
//auth0/angular-jwt
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  userSignOut(){
    this.authToken =null;
    this.user=null;
    localStorage.clear();
  }

  
}
