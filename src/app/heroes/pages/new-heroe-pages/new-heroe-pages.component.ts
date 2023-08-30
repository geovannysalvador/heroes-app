import { Component } from '@angular/core';

@Component({
  selector: 'app-add-heroe-pages',
  templateUrl: './new-heroe-pages.component.html',
  styles: [
  ]
})
export class NewHeroePagesComponent {
  public publications = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]
}
