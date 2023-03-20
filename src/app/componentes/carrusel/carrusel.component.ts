import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
constructor(private _config:NgbCarouselConfig){
  //tiempo de cada foto (ms)
  _config.interval=3000;

}
}
