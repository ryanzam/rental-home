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
  houseImage: String;

  userObj: any;
  house:any;
  owner_id: String;

  selectedImg: File=null;

  constructor(private as: UserAuthService, 
              private router: Router, 
              private hs: HouseService,
              private fms:FlashMessagesService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.userObj = JSON.parse(localStorage.getItem("user"));
    this.owner_id = this.userObj.id;

    this.hs.getHousesOfUser(this.owner_id).subscribe(data=>{
      this.house = data;
      console.log(this.house);
    });
    
    
  }

//delete house for this user
onDeleteHouse(house_id, index) {
  var x = confirm("Are you sure, you want to delete this advert??");
  if (x == true) {
    this.hs.deleteHousesOfUser(house_id).subscribe(data=>{
      this.fms.show(data.message, {cssClass: "alert-success", timeout:2000});
      this.house.splice(index, 1);
    });
  }
}


onfileSelected(file: FileList){
  this.selectedImg = file.item(0);
  console.log(this.selectedImg);
}

//creating a new house method
  onSubmitNewHouse(title, description, availability, rent, location, houseImage) {
    /* const house = {
      title: this.title,
      description: this.description,
      availability: this.availability,
      rent: this.rent,
      location: this.location,
      houseImage: this.selectedImg
  } */
  

/*     if(!this.hs.houseFormValidation(house)){
      this.fms.show("Missing fields, Please fill all fields", {cssClass: "alert-danger", timeout:3000});
      return false;
    }
 */
    

    this.hs.createHouse(title.value, description.value, availability.value, rent.value, location.value, this.selectedImg).subscribe(data=>{
      if(data){

        this.fms.show("New house posted!!", {cssClass: "alert-success", timeout:3000});

        this.router.navigate(['/']);
        console.log(data);
        
      } else {
        this.fms.show("Error posting house Advert!!", {cssClass: "alert-danger", timeout:3000});
      }
    });

  }


}
