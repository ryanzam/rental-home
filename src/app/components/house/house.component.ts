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
  constructor(private hs:HouseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getHouse();
  }

  getHouse(): void{
    const house_id = this.route.snapshot.paramMap.get('id');
    this.hs.getaHouse(house_id).subscribe(data=>{
      this.house = data;
    });
  }
}


