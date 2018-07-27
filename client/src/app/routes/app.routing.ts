import { Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { UserBooksComponent } from '../components/user-books/user-books.component';
import { CategoryItemComponent } from '../components/category-item/category-item.component';
import { ShowBookComponent } from '../components/show-book/show-book.component';

import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'browse', component: UserBooksComponent },
    { path: 'addCategory', component: CategoryItemComponent },
    { path: 'bookDetail/:id', component: ShowBookComponent }
];