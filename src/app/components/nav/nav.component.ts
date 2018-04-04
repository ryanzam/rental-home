import { FlashMessagesService } from 'angular2-flash-messages';
import { UserAuthService } from './../../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: UserAuthService, private router: Router, private fms: FlashMessagesService) { }

  ngOnInit() {
  }

  onSignout(){
    console.log("ramzan");
    this.authService.userSignOut();
    this.fms.show("You have signed out!!", {cssClass: 'alert-success', timeout:3000});
    this.router.navigate(['/']);
    return false;
  }
}
