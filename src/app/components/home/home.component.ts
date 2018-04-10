import { HouseService } from './../../services/house.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  house: Array<Object>;
  constructor(private hs:HouseService, private router:Router) { }

  ngOnInit() {
    this.hs.getHouses().subscribe(data=>{
      this.house = data;
    }), err=> {
      console.log(err);
      return false;
    }
  }

  houseDetails(house_id: any){
    let url: string = "/house/" + house_id;
    this.router.navigateByUrl(url);
  }

}
