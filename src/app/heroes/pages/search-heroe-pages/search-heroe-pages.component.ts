import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/heroe.interface';
import { HeroesServices } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-pages',
  templateUrl: './search-heroe-pages.component.html',
  styles: [
  ]
})
export class SearchHeroePagesComponent {



  public searchInput = new FormControl('');
  public heroes:Hero[] = [];
  public selectedHero?: Hero;

  constructor(private HeroesServices:HeroesServices){}

  searchHero(){
    const value:string = this.searchInput.value || '';

    this.HeroesServices.getSearching(value)
    .subscribe(heroes => this.heroes = heroes);
  }

  onSelectedOptionSearch(event:MatAutocompleteSelectedEvent):void{
    if(!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero)

    this.selectedHero = hero;

  }


}
