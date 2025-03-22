import { Component, Input, input, Output, output } from '@angular/core';
import { SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-video',
  templateUrl: './popup-video.component.html',
  styleUrl: './popup-video.component.scss'
})
export class PopupVideoComponent {
@Input() santiser !:SafeResourceUrl;

constructor(public activeModal: NgbActiveModal){}
closeModal(){
this.activeModal.close();
}
}
