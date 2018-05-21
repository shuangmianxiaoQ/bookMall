import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { HttpService } from '../../http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['../list.component.css'],
  providers: [ HttpService ]
})
export class CategoryListComponent implements OnInit {
  categoryListUrl = `${this.http.baseUrl}goods/category_list.php`;

  totalItems: number = 0;
  itemsPerPage: number = 8;
  pno: any = 1;
  goodsLists: string[] = [];
  fid: string = '';

  constructor(
    private http: HttpService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCurrentPageGoods();
  }

  pageChanged(event: PageChangedEvent): void {
    this.pno = event.page;
    this.getCurrentPageGoods();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  getCurrentPageGoods() {
    this.aRoute.params.subscribe((data: any) => {
      this.fid = data.typeId;
    })
    let httpOptios = {
      params: new HttpParams().set('pno', this.pno).set('fid', this.fid)
    }
    this.http.sendGetMethod(this.categoryListUrl, httpOptios)
      .subscribe((data: any) => {
        console.log(data);
        this.totalItems = data['totalItems'];
        this.itemsPerPage = data['itemsPerPage'];
        this.goodsLists = data['goodsLists'];
      })
  }
}
