import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'; 

@Injectable()
export class BookstoreMessagesService {

  constructor(
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

   showToast(type:string, message: string, title:string){
     this.toastr +'.'+'type('+ title, message + ')'
   }

}
