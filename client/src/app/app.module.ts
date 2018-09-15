import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BookService } from './services/book.service'
import { CategoryService } from './services/category.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';

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
import { LoginComponent } from './components/login/login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { BookFilterPipe } from './pipes/book-filter.pipe';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { LimitToPipe } from './pipes/limit-to.pipe';

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
    RegistrationComponent,
    LoginComponent,
    AuthenticationComponent,
    BookFilterPipe,
    BookFilterComponent,
    CategoryFilterPipe,
    LimitToPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing:true}),
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [BookService, CategoryService, AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
