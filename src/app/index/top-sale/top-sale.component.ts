import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-top-sale',
  templateUrl: './top-sale.component.html',
  styleUrls: ['./top-sale.component.css']
})
export class TopSaleComponent implements OnInit {
  @Input() topSaleItems: string[];

  constructor() { }

  ngOnInit() {
  }

  jumpToDetail(href) {
    open(href, '_blank');   
  }
}
