import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private toast: ToastsManager
   ) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
    this.toast.success('Logout successfully', 'Success');
  }

}
