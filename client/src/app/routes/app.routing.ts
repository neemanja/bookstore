import { Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { UserBooksComponent } from '../components/user-books/user-books.component';
import { CategoryItemComponent } from '../components/category-item/category-item.component';
import { ShowBookComponent } from '../components/show-book/show-book.component';
import { AuthenticationComponent } from '../components/authentication/authentication.component';

import { AuthGuardService } from '../services/auth-guard.service';


import { Component } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'browse', component: UserBooksComponent, canActivate:[AuthGuardService]},
    { path: 'addCategory', component: CategoryItemComponent, canActivate:[AuthGuardService] },
    { path: 'browse/bookDetail/:id', component: ShowBookComponent},
    { path: 'home/bookDetail/:id', component: ShowBookComponent},
    { path: 'authentication', component: AuthenticationComponent}
];