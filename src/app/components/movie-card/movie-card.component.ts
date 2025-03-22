import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie: any;
  @Output() moviedetail:any;
}

