import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ HttpService ]
})
export class OrderComponent implements OnInit {
  addressListUrl: string = `${this.http.baseUrl}address/list.php`;
  orderListUrl: string = `${this.http.baseUrl}cart/item.php`;
  submitOrderUrl: string = `${this.http.baseUrl}order/submit.php`;

  addressList: string[] = [];
  orderLsit: string[] = [];
  totalPrice: string = '';
  totalItems: string = '';
  addressId: any = null;

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAddressList();
    this.getOrderList();
  }

  getAddressList() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      };
      this.http.sendGetMethod(this.addressListUrl, httpOptions)
        .subscribe((data:any) => {
          this.addressList = data;
        })
    }
  }

  getOrderList() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      }
      this.http.sendGetMethod(this.orderListUrl, httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          this.orderLsit = data['cartItems'];
          this.totalPrice = data['total'];
          this.totalItems = data['totalItems'];
        })
    }
  }

  selAddress(info, event) {
    $(event.currentTarget).css('border', '2px solid #ff6700');
    $(event.currentTarget).siblings().css('border', '2px solid #e6e4e2');
    let addressInfo = `${info.province}${info.city}${info.county}${info.street}`;
    let receiverInfo = `${info.receiver} ${info.phone}`;
    $('.addressInfo>span').html(addressInfo);
    $('.receiverInfo>span').html(receiverInfo);
    this.addressId = info.aid;
  }

  jumpToDetail(gid) {
    open('/details/'+gid, '_blank');
  }

  submitOrder() {
    if($('.addressInfo>span').html() === '' || $('.receiverInfo>span').html() === '') {
      alert('请先选择收货地址，再点击下单！');
    } else {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      let nowTimeStamp = String(new Date().getTime());
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
          .set('aid', this.addressId)
          .set('total_price', this.totalPrice)
          .set('status', '1')
          .set('order_time', nowTimeStamp)
      }
      this.http.sendGetMethod(this.submitOrderUrl, httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          this.router.navigateByUrl('/pay/'+data.oid);
        })
    }
  }
}
