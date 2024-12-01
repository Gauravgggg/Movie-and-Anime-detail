import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
import {  provideHttpClient } from '@angular/common/http';
import { ComponentsComponent } from './components/components.component';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './page/home/home.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { MovieDetailComponent } from './components/movie-list/movie-detail/movie-detail.component';
import { AnimeCardComponent } from './components/anime-card/anime-card.component';
import { AnimeDetailComponent } from './components/movie-list/anime-detail/anime-detail.component';
import { SanitizerHtmlPipe } from './pipes/sanitizer-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    PageComponent,
    HomeComponent,
    MovieListComponent,
    MovieCardComponent,
    MovieDetailComponent,
    AnimeCardComponent,
    AnimeDetailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SanitizerHtmlPipe

  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
