import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from './../../services/house.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-house',
  templateUrl: './update-house.component.html',
  styleUrls: ['./update-house.component.css']
})
export class UpdateHouseComponent implements OnInit {
  house = {};
  house_id: string;

  constructor(private hs: HouseService, private route: ActivatedRoute, 
              private fms: FlashMessagesService, private router:Router) { }

  ngOnInit() {
    this.house_id = this.route.snapshot.params['id'];
    this.getHouse(this.house_id);
  }

  getHouse(house_id){
    this.hs.getaHouse(house_id).subscribe(data=>{
      this.house = data;
    })
  }

  onUpdateNewHouse(house_id, data){
    this.hs.updateHousesOfUser(this.house_id, this.house).subscribe(data=>{
      this.house = data;
      this.fms.show(data.message, {cssClass: "alert-success", timeout:2000});
      this.router.navigate(['dashboard']);

    })
  }

}
