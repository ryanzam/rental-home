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

  constructor(private as: UserAuthService, 
              private router: Router, 
              private hs: HouseService,
              private fms:FlashMessagesService, private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

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

    const user = JSON.parse(localStorage.getItem("user"));
    

    this.hs.createHouse(house).subscribe(data=>{
      if(data){

        this.fms.show(data.message, {cssClass: "alert-success", timeout:3000});
        
      } else {
        this.fms.show("Error posting house Advert!!", {cssClass: "alert-danger", timeout:3000});
      }
    });

  }


}
