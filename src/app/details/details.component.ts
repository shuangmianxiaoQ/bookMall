import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ HttpService ]
})
export class DetailsComponent implements OnInit {
  goodsDetailUrl: string = `${this.http.baseUrl}goods/goods_detail.php`;
  addCartUrl: string = `${this.http.baseUrl}cart/add.php`;

  gid: string = '';
  goodsBesic: any = null;
  goodsPic: any = null;
  goodsDetail: any = null;
  count: any = 1;

  constructor(
    private http: HttpService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getgoodsInfo();
  }

  getgoodsInfo() {
    this.aRoute.params.subscribe(data => {
      this.gid = data.goodsId;
    })
    let httpOptios = {
      params: new HttpParams().set('gid', this.gid)
    }
    this.http.sendGetMethod(this.goodsDetailUrl, httpOptios)
      .subscribe((data: any) => {
        console.log(data);
        this.goodsBesic = data[0];
        this.goodsPic = data['picList'];
        this.goodsDetail = data['detail'][0];
      })
  }

  changePic(pic) {
    $('.preview>.spec img').attr('src', 'assets/'+pic);
  }

  modifyCount(boolean) {
    if(boolean) {
      this.count++;
    } else {
      if(this.count>1) {
        this.count--;
      }
    }
  }

  addToCart() {
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid).set('gid', this.gid).set('count', this.count)
      };
      this.http.sendGetMethod(this.addCartUrl, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg);
        })
    }
  }

  buy() {
    if(!userInfo) {
      alert('用户未登录');
    } else {

    }
  }
}
