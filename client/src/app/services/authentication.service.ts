import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import User from '../models/user.model';

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  isAdmin?: number;
}

interface TokenResponse {
  token: string;
}

@Injectable()
export class AuthenticationService {

  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private saveToken(token: string):void {
    localStorage.setItem('bookstore-token', token);
    this.token = token;
  }

  private getToken(){
    if(!this.token){
      this.token = localStorage.getItem('bookstore-token');
    }
    return this.token;
  }

  public logout(){
    this.token = '';
    window.localStorage.removeItem('bookstore-token');
    this.router.navigateByUrl('/');
  }

  public getUser():User{
    const token = this.getToken();
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    else{
      return null;
    }
  }

  public isLoggedIn():boolean {
    const user = this.getUser();
    if(user) {
      return user.exp > Date.now() / 1000;
    }
    else{
      return false;
    }
  }

  public register(user: TokenPayload): Promise<any>{
    return this.userRequest('register', user)
                  .toPromise()
                  .then((res:any) => {return res || {} })
                  .catch((err:any)=> {return err.message});
  }
  public login(user: TokenPayload): Promise<any>{
    return this.userRequest('login', user)
                  .toPromise()
                  .then((res:any) => {return res || {} })
                  .catch((err:any)=> {return err.message});
  }

  private userRequest(type: 'login'|'register', user?: TokenPayload):Observable<any>{
  
  let formData = new FormData();
  formData.append('name', user.name);
  formData.append('email', user.email);
  formData.append('password', user.password)

   let base = this.http.post(`http://localhost:3001/api/${type}`, formData);

   console.log('servic parse');

   console.log(base);

   const request = base.pipe(
      map((data: TokenResponse) => {
        if(data.token){
          this.saveToken(data.token)
        }
        return data;
      })
    );

   return request
  }

}
