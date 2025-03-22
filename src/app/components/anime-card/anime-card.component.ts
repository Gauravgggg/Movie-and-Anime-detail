import { Component, Input } from '@angular/core';
import { SanitizerHtmlPipe } from '../../pipes/sanitizer-html.pipe';
import { SwiperComponent } from '../swiper/swiper.component';

@Component({
  selector: 'app-anime-card',
  standalone:true,
  imports:[],
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.scss'
})
export class AnimeCardComponent {
@Input() anime:any;

}
