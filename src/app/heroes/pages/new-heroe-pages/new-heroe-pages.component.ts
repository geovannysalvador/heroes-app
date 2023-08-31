import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/heroe.interface';
import { HeroesServices } from '../../services/heroes.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-add-heroe-pages',
  templateUrl: './new-heroe-pages.component.html',
  styles: [
  ]
})
export class NewHeroePagesComponent implements OnInit{

  // Formulario reactivo
  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  public publications = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  constructor(
    private heroesServices:HeroesServices,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    private dialog: MatDialog,
    ){}

  // Que lo trate de asimilar como un Hero Interface
  get currentHerro():Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;
    // cargar la data al formulario reactivo
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroesServices.getHeroById(id))
      )
      .subscribe(hero => {
        if(!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero)
        return;
      })
  }

  // Actualizar o crear heroe
  onSubmit():void{
    if (this.heroForm.invalid) return;

    if(this.currentHerro.id){
      this.heroesServices.updateHero(this.currentHerro)
      .subscribe(hero => {
        this.showMessege(`Heroe: ${hero.superhero}. Actualizado!`)
      });
      return
    }

    this.heroesServices.addHero(this.currentHerro)
    .subscribe(hero => {
      // Mostrar mensaje y navegar
      this.router.navigate(['/heroes/edit', hero.id])
      this.showMessege(`${hero.superhero} created!`)
    })

  }

  deleteHero():void{
    if (!this.currentHerro.id) throw Error('El id es necesario');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result:boolean) => result),
      switchMap(()=> this.heroesServices.deleteHeroById( this.currentHerro.id ) ),
      filter((wasDeleted:boolean) => wasDeleted),
    )
    .subscribe(() =>{
      this.router.navigate(['/heroes'])
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(!result) return;

    //   this.heroesServices.deleteHeroById(this.currentHerro.id)
    //   .subscribe(wasDeleted =>{
    //     if(wasDeleted)
    //     this.router.navigate(['/heroes'])
    //   })


    // });

  }

  showMessege(message:string):void{
    this.snackBar.open(message,'Hecho', {duration: 3000})
  }
}
