import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {
  title: string = '';
  categoryID = {
    model:null,
    availableOptions: []
  };
  showResetBtn:boolean = false;

  @Input() set isLoad(isLoad){
    if(isLoad){
      this.title = '';
      this.categoryID.model = '';
    }
  }
  @Output() bookTitleEvent = new EventEmitter();
  @Output() categoryIdEvent = new EventEmitter();

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then(data => {
      this.categoryID.availableOptions = data.categories;
    })

  }

  changeTitle(title){
    this.bookTitleEvent.emit(title);
  }

  CategorySelected(categoryId){
    this.showResetBtn = true;
    this.categoryIdEvent.emit(categoryId);
  }

  resetSelectCategory(){
    this.showResetBtn = false;
    this.categoryID.model = null;    
    this.categoryIdEvent.emit('');
  }

}
