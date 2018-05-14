import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  @Input() firstRecommendedItem: any;
  @Input() restRecommendedItems: string[];

  constructor() { }

  ngOnInit() { }

}
