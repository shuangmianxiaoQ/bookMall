import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { HttpService } from '../../http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['../list.component.css'],
  providers: [ HttpService ]
})
export class SearchListComponent implements OnInit {
  searchListUrl = `${this.http.baseUrl}header/search_list.php`;
  addCartUrl: string = `${this.http.baseUrl}cart/add.php`;

  totalItems: number = 0;
  itemsPerPage: number = 8;
  pno: any = 1;
  goodsLists: string[] = [];
  kw: string = '';

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
      this.kw = data.keyword;
    })
    let httpOptios = {
      params: new HttpParams().set('pno', this.pno).set('kw', this.kw)
    }
    this.http.sendGetMethod(this.searchListUrl, httpOptios)
      .subscribe((data: any) => {
        console.log(data);
        this.totalItems = data['totalItems'];
        this.itemsPerPage = data['itemsPerPage'];
        this.goodsLists = data['goodsLists'];
      })
  }

  jumpToDetail(gid) {
    open('/details/'+gid);
  }

  addToCart(gid) {
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid).set('gid', gid).set('count', '1')
      };
      this.http.sendGetMethod(this.addCartUrl, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg);
        })
    }
  }
}
