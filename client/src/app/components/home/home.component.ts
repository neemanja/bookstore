import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service'
import Book from '../../models/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  booksList: Book[];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.getBooks().then(books => {
      this.booksList = books.books;
      console.log(this.booksList);
    })
  }

}
