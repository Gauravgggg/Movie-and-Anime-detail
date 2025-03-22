import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieServiceService } from '../../service/movie-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error, log } from 'node:console';
import { CommonModule } from '@angular/common';
import { SwiperComponent } from '../swiper/swiper.component';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { AppModule } from '../../app.module';
import { AnimeCardComponent } from '../anime-card/anime-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports:[CommonModule,FormsModule,SwiperComponent,MovieCardComponent,AnimeCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  })
export class MovieListComponent {
  movies: any[] = [];
  anime:any [] = [];
  latest:any[] =[];
  searchQuery: string = '';
  animeboolean: boolean = false;

  constructor(private movieService: MovieServiceService, private router:Router, private route:ActivatedRoute) {}

  config: any = {
    // containerClass: '',
    // slideClass: '',
    // loop: true,
    // slidesPerView: 4,
    direction: 'horizontal',
    slidesPerView: 6,
    spaceBetween: 10,
    sideButton:true,
    navigation: false,
    autoplay: {
      // delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
    320: {
      slidesPerView: 1, // Below 768px and above 320px
      // spaceBetween:100
    },
    576: {
          slidesPerView: 2,
        },
    768: {
      slidesPerView: 3, // Below 1024px and above 768px
    },
    1024: {
      slidesPerView: 6, // Above 1024px
    },
  }
};


  ngOnInit() {
    this.loadPopularMovies();
    this.loadanime();
    this.loadtrendmovies();
  }
  isanime(){
    this.animeboolean = false
  }

  loadPopularMovies() {
    this.movieService.getPopularMovies().subscribe(response => {
      this.movies = response.results;
      console.log(this.movies);

    });
  }

  loadtrendmovies(){
    this.movieService.getlatest().then(
      (res:any)=>{
        this.latest = res.results
      }
    ).catch((error)=>{
      console.log('latest trend movie',error);
      
    });
    ;
    
  }

  loadanime(){
    this.movieService.getTopAnime().then(
      (res:any)=>{
        this.anime  = res.data;
        console.log("anime-->",res);
      }).catch((error)=>{
        console.log(error);
      });
  }


  onSearch() {
    if (this.searchQuery.trim()) {
      this.movieService.searchMovies(this.searchQuery).subscribe(response => {
        this.movies = response.results;
      });
    } else {
      this.loadPopularMovies();
    }
  }

  onanimesearch(){
    if (this.searchQuery.trim()) {
      this.movieService.getanimesearch(this.searchQuery).subscribe(response => {
   this.anime = response.data;
      });
    } else {
      this.loadanime();
    }
  }

  ondetail(id:number,action: any){
    switch (action) {
      case 'movie': this.router.navigate(['/detail',id])
        break;
    case 'anime': this.router.navigate(['/details',id])
      break;
    }

  }

}
