import { UserAuthService } from './../../services/user-auth.service';
import { HouseService } from './../../services/house.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  house_id: string;
  house: any;
  owner_id: string;
  owner:any;
  constructor(private hs:HouseService, private route: ActivatedRoute, private as: UserAuthService) { }

  ngOnInit() {
    this.getHouse();
  }

  getHouse(){
    const house_id = this.route.snapshot.paramMap.get('id');
    this.hs.getaHouse(house_id).subscribe(data=>{
      this.house = data;
      this.as.getUser(this.house.owner_id).subscribe(data=>{
        this.owner = data;
        console.log(this.owner);
      });
    });
  }
}

