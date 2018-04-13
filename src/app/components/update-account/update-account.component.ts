import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  user = {};
  user_id : string;
  constructor(private as: UserAuthService, 
              private route:ActivatedRoute, 
              private fms:FlashMessagesService, 
              private router: Router) 
              { }

  ngOnInit() {
    this.user_id = this.route.snapshot.params['id'];
    this.as.userAccount().subscribe(data=>{
      this.user = data.user;
    }); 
  }

    onUpdateUser(user_id){
      console.log("hi this is ramzan");

      this.as.userAccountUpdate(this.user_id, this.user).subscribe(data=>{
        if(data.sucess === false) {
          this.fms.show(data.message, {cssClass: "alert-info", timeout:2000});
        } else {
          this.user = data;
          this.fms.show(data.message, {cssClass: "alert-success", timeout:2000});
          this.router.navigate(['account']);
        }
        
      
      });
    }
}

