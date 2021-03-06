import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css']
})
export class NewArrivalComponent implements OnInit {
  @Input() newArrivalItems: string[];

  constructor() { }

  ngOnInit() {}

  jumpToDetail(href) {
    open(href, '_blank');   
  }
}
