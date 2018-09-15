import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 userForm: FormGroup;


 @Input() set resetRegister(show){
   if(show){
     this.userForm.reset();
   }
 }

 @Output() registerUserEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { 

    this.userForm = this.fb.group({
      'name':[null, Validators.required],
      'email':[null, [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      'password': [null, Validators.required],
      'repeatPassword':[null, Validators.required]
    }, { validator: this.matchValidators});
  }

  ngOnInit() {
  }

  matchValidators(fg: FormGroup){
    return fg.controls['password'].value === fg.controls['repeatPassword'].value ? null: {'mismatch':true};
  }

  register(){
    this.registerUserEvent.emit(this.userForm.value);
  }

}
