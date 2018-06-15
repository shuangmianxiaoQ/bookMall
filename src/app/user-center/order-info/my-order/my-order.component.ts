import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../http.service';
import { OrderInfoService } from '../order-info.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  providers: [ HttpService, OrderInfoService ]
})
export class MyOrderComponent implements OnInit {
  @Input() orderInfos: any;

  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;
  orderCancelUrl: string = `${this.http.baseUrl}order/cancel.php`;

  allOrder: any = null;

  constructor(
    private orderInfo: OrderInfoService,
    private http: HttpService,
  ) {
    orderInfo.orderInfo$.subscribe((data: any) => {
      this.orderInfos = data;
    })
  }

  ngOnInit() {
    this.getOrderInfo();
  }

  getOrderInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      }
      this.http.sendGetMethod(this.orderInfoUrl, httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          this.allOrder = data['all'];
        })
    }
  }

  cancelOrder(oid) {
    let httpOptions = {
      params: new HttpParams().set('oid', oid)
    }
    this.http.sendGetMethod(this.orderCancelUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        alert(data.msg);
      })
  }
}
