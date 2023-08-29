import { Component } from '@angular/core';

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
  ]
}
