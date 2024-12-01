import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieServiceService } from '../../../service/movie-service.service';
import { error, log } from 'node:console';
import { loadavg } from 'node:os';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent  implements OnInit, OnDestroy{

  id:any;
  moviedetail:any=[]
  vidoedata:any=[];
  sanitizedUrls: SafeResourceUrl []= [];

constructor(private router:Router, private route:ActivatedRoute, private movieService:MovieServiceService, private sanitizer:DomSanitizer) {

}

ngOnInit(): void {
  this.route.paramMap.subscribe(param=>{
this.id = param.get('id');
console.log(this.id);
if (this.id) {
  this.ondetail(this.id);
this.video(this.id);

}

  })
}


ondetail(id:any){
  this.movieService.getMovieDetails(id).subscribe((res=>{
    this.moviedetail = res;
    // this.getimdb(res.imdb_id);
    console.log(res);
    this.moviewatchproviderbyid(this.id);
    this.getimage(this.id);
  }));
}

video(id:any){
   this.movieService.videobyid(id).then(
    res=>{
      console.log(res);
      this.vidoedata = res;
      const videos =   this.vidoedata.results.filter((item: { type: string; }) => item.type === "Trailer")
      console.log('video data-->',videos);
      this.moviedetail = {...this.moviedetail, videos};
      console.log(this.moviedetail);
      this.sanitizerUrls();
      this.creditid(this.id);
    }

   ).catch((error)=>{
    console.log('video error',error);
   })

}

creditid(id:any){
  this.movieService.creditbyid(id).then(credit=>{
    console.log('credit by id',credit);
    this.moviedetail = {...this.moviedetail, credit};
    console.log(this.moviedetail);

  }).catch((error)=>{
    console.log(error);
  });
}

moviewatchproviderbyid(id:any){
  this.movieService.watchprovidebyid(id).then(
    res=>{
      console.log('watch provider-->',res);
    }
  ).catch(
    (error)=>{
      console.log(error);

    }  )
}

sanitizerUrls(){
  console.log(this.moviedetail.videos);
this.sanitizedUrls = this.moviedetail.videos.map((video:any)=>{
//  const sanitizedurl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`)
const sanitizedurl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.themoviedb.org/video/play?key=${video.key}`)
 return sanitizedurl
});

console.log(this.sanitizedUrls);
console.log(this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/FU_bAopCcSE`)
);

}


getimdb(id:any){
  this.movieService.finddatabyid(id).subscribe(res=>{
    console.log('imdb data-->',res);
  })
}

getgenername(){
  return this.moviedetail.genres.map((gener: { name: any; }) =>gener.name).join(', ')
}

getimage(id:any){
  this.movieService.imagebyid(id).then(
    image=>{
      console.log('image-->',image);
      this.moviedetail = {...this.moviedetail,image}
    }
  ).catch(
    (error)=>{
      console.log('image error-->',error);
    }
  )

}

ngOnDestroy(): void {

}




}
