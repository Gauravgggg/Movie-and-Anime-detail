import { Component } from '@angular/core';
import { MovieServiceService } from '../../service/movie-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: any[] = [];
  anime:any [] = [];
  searchQuery: string = '';
  animeboolean: boolean = false;

  constructor(private movieService: MovieServiceService, private router:Router, private route:ActivatedRoute) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadanime();
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

  ondetail(id:number,action: any){
    switch (action) {
      case 'movie': this.router.navigate(['/detail',id])
        break;
    case 'anime': this.router.navigate(['/details',id])
      break;
    }

  }

}
