import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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
  pno: any = 1;
  goodsLists: string[] = [];

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getCurrentPageGoods();
  }

  pageChanged(event: PageChangedEvent): void {
    // console.log(event);
    this.pno = event.page;
    this.getCurrentPageGoods();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getCurrentPageGoods() {
    let httpOptios = {
      params: new HttpParams().set('pno', this.pno)
    }
    this.http.sendGetMethod(this.searchAllUrl, httpOptios)
      .subscribe((data: any) => {
        this.totalItems = data['totalItems'];
        this.itemsPerPage = data['itemsPerPage'];
        this.goodsLists = data['goodsLists'];
      })
  }
}
