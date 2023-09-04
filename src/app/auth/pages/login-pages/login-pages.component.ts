import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styles: [
  ]
})
export class LoginPagesComponent {

  constructor(
    private authService:AuthService,
    private router:Router
    ){}

  OnLogin():void{
    this.authService.login('fer@gmail.com', '123456')
    .subscribe( user => {
      this.router.navigate(['/'])
    });

  }
}
