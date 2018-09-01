import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthenticationService } from '../../services/authentication.service';
import Book from '../../models/book.model';

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
    private authenticationService: AuthenticationService
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
                    })
    }
    else{
      let userId = this.authenticationService.getUser()._id
      this.bookService.getUserBoks(userId)
                      .then(response => {
                        this.booksList = response.books;
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
                      this.booksList.push(res.book);
                      document.getElementById('closeAddModalBtn').click();
                    })
                    .catch(err => {
                      console.log(err.message);
                    })
  }

  updateBook(book:Book){
    this.bookService.putBook(book)
                    .then(res => {
                      this.getAllBooks();      
                      document.getElementById('closeEditModalBtn').click();
                    })
                    .catch(err => {
                      console.log(err.message);
                    })
  }

  deleteBook(){
    this.bookService.deleteBook(this.bookToDelete._id)
                    .then(td => {
                      const filteredBook = this.booksList.filter(b => b._id !== td.book._id);
                      this.booksList = filteredBook;
                      document.getElementById('closeDeleteModal').click();
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
