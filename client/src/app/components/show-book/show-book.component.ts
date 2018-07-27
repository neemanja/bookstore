import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {
  book: Book = new Book();

  constructor(
    private bookService: BookService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    console.log('USAO OVDE ')
    this.route.paramMap.switchMap((params:ParamMap)=> 
     this.bookService.getBook(params.get('id'))).subscribe(data => {
       this.book = data.book[0];
       console.log(this.book)
      });
  }

}
