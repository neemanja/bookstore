import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Category from '../../models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
category:Category = new Category();
categoryForm: FormGroup;

@Input() set resetCategory(show){
  if(show){
    this.categoryForm.reset();
  }
}
@Output() createCategoryEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required]
    })
   }

  ngOnInit() {
    
  }

  addCategory(){
    this.createCategoryEvent.emit(this.categoryForm.value);
  }

}
