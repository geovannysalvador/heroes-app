import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { NewHeroePagesComponent } from './pages/new-heroe-pages/new-heroe-pages.component';
import { SearchHeroePagesComponent } from './pages/search-heroe-pages/search-heroe-pages.component';
import { ListPagesComponent } from './pages/list-pages/list-pages.component';
import { HeroPagesComponent } from './pages/hero-pages/hero-pages.component';

// localhost:4200/heroes/

const routes: Routes = [
  {
    path: '',
    component: LayoutPagesComponent,
    children: [
      { path: 'new-hero', component: NewHeroePagesComponent },
      { path: 'search', component: SearchHeroePagesComponent },
      { path: 'edit/:id', component: NewHeroePagesComponent },
      { path: 'list', component: ListPagesComponent },
      { path: ':id', component: HeroPagesComponent },
      { path: '**', redirectTo: 'list' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
