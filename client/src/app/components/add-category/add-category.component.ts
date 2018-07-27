import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Category from '../../models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
category:Category = new Category();

@Output() createCategoryEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addCategory(category){
    this.createCategoryEvent.emit(category);
  }

}
