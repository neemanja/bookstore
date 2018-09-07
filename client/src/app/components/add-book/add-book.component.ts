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
 categoryID = {
   model:null,
   availableOptions: []
 };
 bookForm: FormGroup;

 @Input() isUpdate; 
 @Input() set editBook(book:Book){
   this.bookForm.setValue({
     title: book.title,
     author: book.author,
     category: book.category,
     publisher: book.publisher,
     isbn: book.isbn,
     url: book.url,
     description: book.description,
     cover: book.cover
   });
   this.categoryID.model = book.category;
 };

 @Output() createBookEvent = new EventEmitter();
 @Output() updateBookEvent = new EventEmitter();


  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'category' : [null, Validators.required],
      'publisher' : [null, Validators.required],
      'isbn' : [null, [Validators.required, Validators.pattern('^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$')]],
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
  
  addBook(){
    this.createBookEvent.emit(this.bookForm.value);
  }

  updateBook(){
    this.updateBookEvent.emit(this.bookForm.value);
  }

  onOptionsSelected(cat){
    this.bookForm.controls['category'].setValue(this.categoryID.model);
  }
  
  onFileChange(event) {
    //this.book.cover = <File>event.target.files[0];
  }



}
