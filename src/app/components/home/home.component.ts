import { HouseService } from './../../services/house.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  house: Array<Object>;
  constructor(private hs:HouseService) { }

  ngOnInit() {
    this.hs.getHouses().subscribe(data=>{
      this.house = data;
      console.log("output: "+ this.house);
    }), err=> {
      console.log(err);
      return false;
    }
  }

}
