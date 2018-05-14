import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  @Input() newRankItems: string[];
  @Input() sellRankItems: string[];

  constructor() { }

  ngOnInit() {
  }

}
