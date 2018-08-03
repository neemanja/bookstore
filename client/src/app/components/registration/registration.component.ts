import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../../services/authentication.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 user: TokenPayload = {
   name: '',
   email: '',
   password: ''
 };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    console.log('usao u register');
    this.authenticationService.register(this.user).then( () => {
      this.router.navigateByUrl('/browse');   
    }).catch(err => {
      console.log(err);
    })
  }

}
