import { ActivatedRoute, Router } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MovieServiceService } from '../../../service/movie-service.service';
import { error, log } from 'node:console';
import { loadavg } from 'node:os';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule, ViewportScroller } from '@angular/common';
import { GeolocationService } from '../../../service/geolocation.service';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';
import { SwiperComponent } from '../../swiper/swiper.component';

register();

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule,SwiperComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MovieDetailComponent  implements OnInit, OnDestroy{

  id:any;
  moviedetail:any=[]
  vidoedata:any=[];
  sanitizedUrls: SafeResourceUrl []= [];
  @ViewChild('swiperRef') swiper!: ElementRef<SwiperContainer>;
  videoshow:boolean = true;
  castshow:boolean = true;


  config: any = {
    // containerClass: '',
    // slideClass: '',
    // loop: true,
    // slidesPerView: 4,
    direction: 'horizontal',
    slidesPerView: 6,
    spaceBetween: 10,
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

constructor(private router:Router, private route:ActivatedRoute, private movieService:MovieServiceService, private sanitizer:DomSanitizer, private viewportsroll:ViewportScroller
  ,private loactionservice:GeolocationService
) {

}

ngOnInit(): void {
  this.viewportsroll.scrollToPosition([0,0]);
  this.route.paramMap.subscribe(param=>{
this.id = param.get('id');
console.log(this.id);
if (this.id) {
  this.ondetail(this.id);
this.video(this.id);

}

  });

  this.getgeolocation();

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

      if (videos == 0) {
        this.videoshow = false
      }
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
    if (this.moviedetail.credit.cast == 0) {
      this.castshow = false
    }
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
 const sanitizedurl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${video.key}`)
// const sanitizedurl =  this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.themoviedb.org/video/play?key=${video.key}`)
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
getgeolocation(){
this.loactionservice.getLoaction().then(
  (position)=>{
    console.log("geo loaction",position);
  }
)
}

ngOnDestroy(): void {

}




}
