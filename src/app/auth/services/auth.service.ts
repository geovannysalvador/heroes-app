import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of, tap } from 'rxjs';

import { enviroments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})

export class AuthService {

  private baseUrl = enviroments.baseUrl;
  private user?:User

  constructor(private http: HttpClient) { }

  get currentUser():User | undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email:string, password:string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user),
      tap( user => localStorage.setItem('Toke', 'user.id.toString()'))
    )

  }

  checkAuth():Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( err => of(false)),
    )


  }


  logout(){
    this.user = undefined;
    localStorage.clear();

  }

}
