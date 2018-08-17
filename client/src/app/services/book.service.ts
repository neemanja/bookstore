import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService } from './authentication.service';

import  Book  from '../models/book.model';

@Injectable()
export class BookService {
  booksUrl:string = 'http://localhost:3001/api/books';

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getBooks():Promise<any>{
    return this.http.get(this.booksUrl)
               .toPromise()
               .then((res:any) => {return res || {} })
               .catch((err:any)=> {return err.message})
  }

  getBook(id):Promise<any>{
    return this.http.get(this.booksUrl+'/'+id)
               .toPromise()
               .then((res:any) => {return res || {} })
               .catch((err:any)=> {return err.message})
  }

  getUserBoks(userId):Promise<any>{
    return this.http.get(this.booksUrl+'/userBooks/'+userId)
               .toPromise()
               .then((res:any) => {return res || {} })
               .catch((err:any)=> {return err.message})
  }

  postBook(book):Promise<any>{
    let formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('publisher', book.publisher);
    formData.append('category', book.category);
    formData.append('isbn', book.isbn);
    formData.append('cover', book.cover);
    formData.append('url', book.url);
    formData.append('description', book.description);
    formData.append('userId', book.userId);
    
    let bearerHeader: string = 'Bearer ' + this.auth.getToken();
    let header = new HttpHeaders().set('authorization', bearerHeader);
    header.set('Accept', 'application/json');

    

    return this.http.post(this.booksUrl, formData, {headers:header})
               .toPromise()
               .then((res:any) => {return res || {} })
               .catch((err:any)=> {return err.message})
  }

  putBook(book):Promise<any>{
    let formData = new FormData();
    formData.append('id', book._id);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('publisher', book.publisher);
    formData.append('category', book.category);
    formData.append('isbn', book.isbn);
    formData.append('cover', book.cover);
    formData.append('url', book.url);
    formData.append('description', book.description);

    return this.http.put(this.booksUrl, formData)
               .toPromise()
               .then((res:any) => {return res || {}})
               .catch((err:any) => {return err.message})             
  }

  deleteBook(id):Promise<any>{
    return this.http.delete(this.booksUrl+'/'+id)
               .toPromise()
               .then((res:any)=> {return res})
               .catch((err)=> {return err})
  }
}