import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/heroe.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero-pages',
  templateUrl: './hero-pages.component.html',
  styles: [
  ],
})
export class HeroPagesComponent implements OnInit{

  public hero?:Hero

  constructor(
    private heroesServices:HeroesServices,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      // delay(1000),
      switchMap(({id}) => this.heroesServices.getHeroById(id)),
    )
    .subscribe(hero=>{
      if(!hero) return this.router.navigate(['/heroes/list'])

      this.hero = hero;
      return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}
