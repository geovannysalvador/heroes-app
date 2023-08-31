import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-pages',
  templateUrl: './layout-pages.component.html',
  styles: [
  ]
})
export class LayoutPagesComponent {

  public sidebarItems = [
    {
      label: 'Listado', icon: 'view_list', url: './list'
    },
    {
      label: 'Agregar', icon: 'add_box', url: './new-hero'
    },
    {
      label: 'buscar', icon: 'search', url: './search'
    }
  ];

  constructor(
    private authService:AuthService,
    private router:Router
    ){}

  get user():User | undefined{
    return this.authService.currentUser;
  }

  OnLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
