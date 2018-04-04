import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HouseService {

  constructor(private http: Http) { }

  getHouses() {
      return this.http.get('http://localhost:3000/house/gethouse')
        .map(res => res.json());
    }
  }
