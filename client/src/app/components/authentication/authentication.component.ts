import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showlogin: boolean  = false;
 
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  changeToRegister(){
    this.showlogin = true;
  }

  changeToLogin(){
    this.showlogin = false;
  }

  loginUser(user){
    this.authenticationService.login(user).then(()=> {
      this.router.navigateByUrl('/browse');
    }).catch(err => {
      console.log(err);
    })
  }
  
  registerUser(user){
    this.authenticationService.register(user).then( () => {
      this.router.navigateByUrl('/browse');   
    }).catch(err => {
      console.log(err);
    })
  }

}
