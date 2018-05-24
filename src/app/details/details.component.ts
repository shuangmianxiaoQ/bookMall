import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [ HttpService ]
})
export class DetailsComponent implements OnInit {
  goodsDetailUrl: string = `${this.http.baseUrl}goods/goods_detail.php`;

  gid: string = '';
  goodsDetails: any = null;
  goodsPic: any = null;

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
        this.goodsDetails = data[0];
        this.goodsPic = data['picList'];
      })
  }

  changePic(pic) {
    $('.preview>.spec img').attr('src', 'assets/'+pic);
  }
}