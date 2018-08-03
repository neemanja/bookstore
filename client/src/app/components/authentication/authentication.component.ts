import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showlogin: boolean  = true;
 
  constructor() { }

  ngOnInit() {
  }

  changeToRegister(){
    this.showlogin = true;
  }

  changeToLogin(){
    this.showlogin = false;
  }

}
