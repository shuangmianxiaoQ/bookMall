import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  obj: any = {"单选题": "一", "多选题": "2"};

  constructor() { }

  ngOnInit() {
  }

}
