import { join } from 'node:path';
import { DomSanitizer } from '@angular/platform-browser';
import { MovieServiceService } from './../../../service/movie-service.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { error } from 'console';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrl: './anime-detail.component.scss'
})
export class AnimeDetailComponent  implements OnInit{
  id:any;
  animedetail:any=[]
  constructor(private router:Router, private route: ActivatedRoute, private movieservice:MovieServiceService, private sanitizer:DomSanitizer) {}

ngOnInit(): void {
this.route.paramMap.subscribe(param=>{
 this.id =  param.get('id')
});
this.getanimedetail(this.id);
this.getepisodes(this.id);

}

getgener(){
 return this.animedetail.genres.map((geners:any)=>geners.name).join(',');
}

getanimedetail(id:any){
this.movieservice.getanimeDetail(id).then(
(res:any)=>{
  console.log('anime detail',res);
  this.animedetail = res.data;
}
).catch(
  error=>{
    console.log("anime detail error",error);
  }
)
}

getepisodes(id:any){
  this.movieservice.getanimeEpisodesId(id).then(
    (res)=>{
      console.log("anime episode==>",res);

    }
  ).catch(
    error=>{
      console.log(error);

    }
  )
}

}
