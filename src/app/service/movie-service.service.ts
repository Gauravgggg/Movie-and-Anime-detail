import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'node:assert';
import { error } from 'node:console';
import { promises } from 'node:dns';
import { resolve } from 'node:path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
  private apiKey = '3fd2be6f0c70a2a598f084ddfb75487c'; // This is a public API key for demo
  private animebaseUrl = 'https://api.jikan.moe/v4';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }


  getgenre(){
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }

  finddatabyid(id:any){
    return this.http.get(`${this.baseUrl}/find/${id}?api_key=${this.apiKey}&external_source=imdb_id`);
  }


  videobyid(id:any){
//  return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
return new Promise((resolve,rejects)=>{
  this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).subscribe(
    (success)=>{
      resolve(success)
    },(error)=>{
      rejects(error);
     }
    );
  });
}


creditbyid(id:any){
  return new Promise((resolve,rejects)=>{
    this.http.get(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`).subscribe(
      (success)=>{
        resolve(success)
      },
      (error)=>{
        rejects(error)
      }
    )
  })
}

watchprovidebyid(id:any){
  return new Promise ((resolve,rejects)=>{
this.http.get(`${this.baseUrl}/movie/${id}/watch/providers?api_key=${this.apiKey}`).subscribe(
  (success)=>{
    resolve(success)
  },
  (error)=>{
    rejects(error)
  }
)
  })
}

imagebyid(id:any){
  return new Promise((resolve,rejects)=>{
    this.http.get(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`).subscribe(
      (success)=>{
        resolve(success)
      },(error)=>{
        rejects(error);
       }
      );
    });
}

// Anime ApI

getTopAnime(page: number = 1) {
  return  new Promise((resolve,rejects)=>{
    this.http.get(`${this.animebaseUrl}/top/anime?page=${page}`).subscribe(
      (success)=>{
        resolve(success);
      },
      (error)=>{
        rejects(error);
      }
    );
  })

}

getanimeDetail(id:number){
  return new Promise((resolve,rejects)=>{
   this.http.get(`${this.animebaseUrl}/anime/${id}/full`).subscribe(
     (success)=>{
       resolve(success);
     },
     (error)=>{
       rejects(error);
     }
   )
   })
 }

 getanimeEpisodesId(id:any){
  return new Promise((resolve,rejects)=>{
    this.http.get(`${this.animebaseUrl}/anime/${id}/episodes`).subscribe(
    (success)=>{
      resolve(success)
    },
    (error)=>{
      rejects(error)
    }
    )
  })
 }


}

