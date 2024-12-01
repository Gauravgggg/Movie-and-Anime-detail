import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { MovieDetailComponent } from './components/movie-list/movie-detail/movie-detail.component';
import { AnimeDetailComponent } from './components/movie-list/anime-detail/anime-detail.component';


const routes: Routes = [
 {path:'home', component:HomeComponent},
 {path:'detail/:id', component:MovieDetailComponent},
 {path:'details/:id', component: AnimeDetailComponent},
  {path: '', redirectTo:'home' , pathMatch:'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
