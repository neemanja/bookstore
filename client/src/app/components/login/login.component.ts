import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: TokenPayload = {
    email: '',
    password: '',
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.authenticationService.login(this.user).then(()=> {
      this.router.navigateByUrl('/browse');
    }).catch(err => {
      console.log(err);
    })
  }

}
