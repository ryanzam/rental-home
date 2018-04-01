import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  phone: Number;
  email: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.name, this.password);
  }

}
