import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Event, NavigationEnd } from '@angular/router';
import { BookService } from '../../services/book.service';
import Book from '../../models/book.model';

import 'rxjs/add/operator/switchMap';


const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;



@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {
  book: Book = new Book();
  breadcrumbs:boolean=false;

  constructor(
    private bookService: BookService,
    private route:ActivatedRoute,
    private router: Router
  ) { 
   
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params:ParamMap)=> 
     this.bookService.getBook(params.get('id'))).subscribe(data => {
       this.book = data.book[0];
      });

      const parent = this.router.url.split('/');
      if(parent[1]=='browse'){
        this.breadcrumbs = true;
      }
      


  }

}
