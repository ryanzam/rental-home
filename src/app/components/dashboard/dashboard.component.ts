import { FlashMessagesService } from 'angular2-flash-messages';
import { HouseService } from './../../services/house.service';
import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: Object;
  title: String;
  description: String;
  availability: String;
  rent: String;
  location: String;

  userObj: any;
  house:any;
  owner_id: string;

  constructor(private as: UserAuthService, 
              private router: Router, 
              private hs: HouseService,
              private fms:FlashMessagesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userObj = JSON.parse(localStorage.getItem("user"));
    this.owner_id = this.userObj.id;

    console.log("owner id : "+ this.owner_id);

    this.hs.getHousesOfUser(this.owner_id).subscribe(data=>{
      this.house = data;

      console.log("house for this user : "+ this.house);
    });
    
    
  }

//get house for this user




//creating a new house method
  onSubmitNewHouse() {
    const house = {
      title: this.title,
      description: this.description,
      availability: this.availability,
      rent: this.rent,
      location: this.location
    }

    if(!this.hs.houseFormValidation(house)){
      this.fms.show("Missing fields, Please fill all fields", {cssClass: "alert-danger", timeout:3000});
      return false;
    }

    

    this.hs.createHouse(house).subscribe(data=>{
      if(data){

        this.fms.show(data.message, {cssClass: "alert-success", timeout:3000});

        this.router.navigate(['/']);
        
      } else {
        this.fms.show("Error posting house Advert!!", {cssClass: "alert-danger", timeout:3000});
      }
    });

  }


}
