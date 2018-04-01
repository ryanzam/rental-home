import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApidataService {

  constructor(private http: Http) { }

  users: any;

  getUsers() {
    return this.http.get('/api/users').map(users => {
      this.users = users.json().data;
    })
  }
}
