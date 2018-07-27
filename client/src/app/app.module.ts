import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookService } from './services/book.service'
import { CategoryService } from './services/category.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UserBooksComponent } from './components/user-books/user-books.component';

import { RouterModule } from '@angular/router';
import { routes } from './routes/app.routing';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { RegistrationComponent } from './components/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddBookComponent,
    UserBooksComponent,
    CategoryItemComponent,
    AddCategoryComponent,
    ShowBookComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing:true})
  ],
  providers: [BookService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
