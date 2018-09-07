import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthenticationService } from '../../services/authentication.service';
import Book from '../../models/book.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {
  booksList:Book[]
  bookToDelete:Book = new Book();
  bookToEdit:Book = new Book();
  bookTitle:string = '';
  categoryId:string = '';
  showFilter:boolean = false;

  constructor(
    private bookService: BookService,
    private authenticationService: AuthenticationService,
    private toast: ToastsManager
  ) { 
    
  }

  ngOnInit() {
   this.getAllBooks();   
  }

  getAllBooks(){
    if(this.authenticationService.getUser().isAdmin == 1){
      this.bookService.getBooks()
                    .then(books =>{
                      this.booksList = books.books;
                      if(this.booksList.length<=0){
                        this.toast.info('No books in db', 'Info');
                      }
                    })
                    .catch(err =>{
                      this.toast.error(err.message, 'Error');
                    })
    }
    else{
      let userId = this.authenticationService.getUser()._id
      this.bookService.getUserBoks(userId)
                      .then(response => {
                        this.booksList = response.books;
                        if(this.booksList.length<=0){
                          this.toast.info('No books in db', 'Info');
                        }
                      })
                      .catch(err =>{
                        this.toast.error(err.message, 'Error');
                      })
    }
    
  }

  showDeleteBook(book){
    this.bookToDelete = book;
  }

  showEditBook(book){
    this.bookToEdit = book;
  }

  createBook(book: Book){   
    book.userId = this.authenticationService.getUser()._id; 
    this.bookService.postBook(book)
                    .then(res => {
                      if(res.success){
                        this.booksList.push(res.book);
                        document.getElementById('closeAddModalBtn').click();
                        this.toast.success(res.message, 'Success')
                      }
                    })
                    .catch(err => {
                      this.toast.error(err.message, 'Error');
                    })
  }

  updateBook(book:Book){
    this.bookService.putBook(book)
                    .then(res => {
                      if(res.success){
                        this.getAllBooks();      
                        document.getElementById('closeEditModalBtn').click();
                        this.toast.success(res.message, 'Success');
                      }
                    })
                    .catch(err => {
                      this.toast.error(err.message, 'Error');
                    })
  }

  deleteBook(){
    this.bookService.deleteBook(this.bookToDelete._id)
                    .then(td => {
                      if(td.success){
                        const filteredBook = this.booksList.filter(b => b._id !== td.book._id);
                        this.booksList = filteredBook;
                        document.getElementById('closeDeleteModal').click();
                        this.toast.success(td.message, 'Success');
                      }
                    })
                    .catch(err => {
                      this.toast.error(err.message, 'Error');
                    })
  }

  bookTitleChange(title){
    this.bookTitle = title;
  }

  CategoryIdChange(categoryId){
    this.categoryId = categoryId;
  }

  showHideFilters(){
    this.bookTitle = '';
    this.categoryId = '';
    this.showFilter = !this.showFilter;
  }

}
