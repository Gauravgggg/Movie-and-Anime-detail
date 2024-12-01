import { Component, Input } from '@angular/core';
import { SanitizerHtmlPipe } from '../../pipes/sanitizer-html.pipe';

@Component({
  selector: 'app-anime-card',
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.scss'
})
export class AnimeCardComponent {
@Input() anime:any;

}
