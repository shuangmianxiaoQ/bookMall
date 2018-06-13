import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ HttpService ]
})
export class HeaderComponent implements OnInit {
  suggestUrl: string = `${this.http.baseUrl}header/suggest.php`;
  logoutUrl: string = `${this.http.baseUrl}user/logout.php`;
  suggestItems: string[] = [];
  itemsLength: number = 0;
  userInfo: any = null;
  keyword: string = '';

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  }

  jumpToDetail(gid, gname) {
    open('details/'+gid, '_blank');
  }

  // 获取JSON数组的长度
  getJsonLength(json) {
    let length = 0;
    for(var i in json) {
      length++;
    }
    return length;
  }

  suggestKey(kw) {
    let httpOptions = {
      params: new HttpParams().set('kw', kw)
    }
    this.http.sendGetMethod(this.suggestUrl, httpOptions)
      .subscribe((data: any) => {
        this.suggestItems = data;
        this.itemsLength = this.getJsonLength(data);
      })
  }

  searchKey(kw) {
    if(kw) {
      open('list/searchList/'+kw, '_blank');
    } else {
      open('list/searchList', '_blank');
    }
  }

  logout() {
    this.http.sendGetMethod(this.logoutUrl, {})
      .subscribe(data => {
        sessionStorage.removeItem('userInfo');
        this.router.navigateByUrl('login');
      })
  }
}
