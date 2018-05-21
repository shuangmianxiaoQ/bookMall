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
  suggestItems: string[] = [];
  itemsLength: number = 0;

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() { }

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
      this.router.navigateByUrl('list/searchList/'+kw);
      location.reload();
    } else {
      this.router.navigateByUrl('list/searchList/'+' ');
      location.reload();
    }
  }
}
