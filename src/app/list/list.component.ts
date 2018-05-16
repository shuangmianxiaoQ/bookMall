import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ HttpService ]
})
export class ListComponent implements OnInit {
  searchAllUrl = `${this.http.baseUrl}header/search.php`;

  totalItems: number = 0;
  itemsPerPage: number = 8;
  goodsLists: string[] = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getAllGoods();
  }

  getAllGoods() {
    this.http.sendGetMethod(this.searchAllUrl, {})
      .subscribe((data: any) => {
        console.log(data);
        this.totalItems = data['totalItems'];
        this.itemsPerPage = data['itemsPerPage'];
        this.goodsLists = data['goodsLists']
      })
  }
}
