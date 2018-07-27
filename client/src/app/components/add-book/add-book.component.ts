import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Book from '../../models/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {
 book:Book = new Book();
 categoryID = {
   model:null,
   availableOptions: []
 };
 bookForm: FormGroup;

 @Input() isUpdate; 
 @Input() set editBook(book){
   this.book = book;
   this.categoryID.model = book.category;
 };

 @Output() createBookEvent = new EventEmitter();
 @Output() updateBookEvent = new EventEmitter();


  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.bookForm = fb.group({
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'category' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'isbn' : [null, Validators.required],
      'url' : [null, Validators.required],
      'description' : [null, Validators.required],
      'cover' : [null, Validators.required]
    })
   }

  ngOnInit() { 
    this.categoryService.getCategories().then(data => {
      this.categoryID.availableOptions = data.categories;
    })
   }
  


  addBook(book){
    this.createBookEvent.emit(this.book);
  }

  updateBook(){
    this.updateBookEvent.emit(this.book);
    //this.bookService.putBook(this.book);
  }

  onOptionsSelected(){
    this.book.category = this.categoryID.model;
  }
  

  onFileChange(event) {
    //this.book.cover = <File>event.target.files[0];
  }



}
