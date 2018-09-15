import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  showLogin: boolean  = false;
  showRegister: boolean = false;
 
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast: ToastsManager
  ) {  }

  ngOnInit() {
  }

  loginUser(user){
    this.authenticationService.login(user).then((usr)=> {
      console.log(usr);
      if(usr.success){
        this.toast.success(usr.message, 'Success');
        this.router.navigateByUrl('/browse');
      }
      else{
        console.log(usr);
        this.toast.warning(usr.message, 'Warning');
      }
     
    }).catch(err => {
      this.toast.error(err.message, 'Error');
    })
  }
  
  registerUser(user){
    this.authenticationService.register(user).then( () => {
      this.router.navigateByUrl('/browse');   
    }).catch(err => {
      this.toast.error(err.message, 'Error');
    })
  }

}
