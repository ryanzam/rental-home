import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: Object;
  constructor(private as: UserAuthService, private router: Router) { }

  ngOnInit() {
    this.as.userAccount().subscribe(account=>{
      this.user = account.user;
    }), err=> {
      console.log(err);
      return false;
    }
  }

}
