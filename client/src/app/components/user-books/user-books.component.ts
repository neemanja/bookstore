import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
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

  constructor(private bookService: BookService) { 
    
  }

  ngOnInit() {
   
    this.getAllBooks();
  }

  getAllBooks(){
    this.bookService.getBooks()
                    .then(books =>{
                      this.booksList = books.books;
                    })
  }

  showDeleteBook(book){
    this.bookToDelete = book;
  }

  showEditBook(book){
    this.bookToEdit = book;
  }

  createBook(book: Book){    
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

}
