import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup

  @Input() set resetLogin(show){
    if(show){
      this.userLoginForm.reset();
    }
  }

  @Output() loginUserEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { 
    this.userLoginForm = this.fb.group({
      'email': [null, [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  login(){
    console.log('login function' );
    this.loginUserEvent.emit(this.userLoginForm.value);
  }

}
