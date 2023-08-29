import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesServices } from '../../services/heroes.service';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styles: [
  ]
})
export class ListPagesComponent implements OnInit {

  public heroes:Hero[] = [];

  constructor(private heroService:HeroesServices){

  }
  ngOnInit(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
