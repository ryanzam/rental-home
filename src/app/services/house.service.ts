import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class HouseService {
  house: any;
  owner_id: any;
  authToken:any;

  constructor(private http: Http) { 
    
  }

  //house lists public view
  getHouses() {
      return this.http.get('http://localhost:3000/house/gethouse')
        .map(res => res.json());
    }
  
//for a single house public view
  getaHouse(house_id: string) {
    return this.http.get(`http://localhost:3000/house/gethouse/${house_id}`)
    .map(res => res.json());
  }

//create house
createHouse(house){
  let header = new Headers();
  this.getOwnerId();
  this.getToken();
  header.append('Content-Type', 'application/json');

  return this.http.post(`http://localhost:3000/house/create/${this.owner_id}`, house, {headers: header})
    .map(res => res.json());
}

//update house


//delete a house



//get houses for a user
getHousesOfUser(owner_id){
  let header = new Headers();
  header.append('Content-Type', 'application/json');
  return this.http.get(`http://localhost:3000/house/getuserhouse/${owner_id}`, {headers: header})
    .map(res => res.json());
}


//token from local storage
getToken(){
  const token = localStorage.getItem('id_token');
  this.authToken =token;
}


getOwnerId(){
  const user = JSON.parse(localStorage.getItem('user'));
  return this.owner_id = user.id;
}

//validation of house form

houseFormValidation(house){
  if (house.title == undefined || house.description == undefined || 
    house.availability == undefined || house.rent == undefined || house.location == undefined){
      return false;
    }
    else {
      return true;
    }    
}


}