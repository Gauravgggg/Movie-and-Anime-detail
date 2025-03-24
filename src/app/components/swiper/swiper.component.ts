import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class SwiperComponent {
  @Input() config: any = {
    // containerClass: '',
    // slideClass: '',
    // loop: true,
    // slidesPerView: 4,
    // spaceBetween: 10,
    // navigation: false,
    // pagination: {
    //   el: '.swiper-pagination',
    //   type: 'bullets',
    //   clickable: true, 
    // },
    // autoplay: false,
    // speed: 500,
    // cssMode: true,
  };

  
  template!: TemplateRef<any> | null;
  @ViewChild('swiperRef') swiper!: ElementRef<SwiperContainer>;


  ngOnInit(){
    if (this.swiper?.nativeElement?.swiper?.autoplay) {
      this.swiper.nativeElement.swiper.autoplay.start();
    } else {
      console.warn('Swiper instance or autoplay is undefined.');
    }
  }
}
