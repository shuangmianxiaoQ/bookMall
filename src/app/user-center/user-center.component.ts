import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { OrderInfoService } from './order-info/order-info.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-center',
  templateUrl: './user-center.component.html',
  styleUrls: ['./user-center.component.css'],
  providers: [ HttpService, OrderInfoService ]
})
export class UserCenterComponent implements OnInit {
  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;

  constructor(
    private http: HttpService,
    private orderInfo: OrderInfoService,
    private router: Router
  ) { }

  ngOnInit() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
      this.router.navigateByUrl('/login');
    }
    // this.getOrderInfo();
  }

  getOrderInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
      this.router.navigateByUrl('/login');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      }
      this.http.sendGetMethod(this.orderInfoUrl, httpOptions)
        .subscribe((data: any) => {
          this.orderInfo.addData(data);
        })
    }
  }
}
