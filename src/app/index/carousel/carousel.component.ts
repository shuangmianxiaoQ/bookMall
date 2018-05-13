import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styles: ['img { width: 100%; height: 224px; cursor: pointer }']
})
export class CarouselComponent implements OnInit {
  @Input() carouselItems: string[];

  constructor() { }

  ngOnInit() { }
}
