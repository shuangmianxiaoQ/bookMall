import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { getOrCreateNodeInjector } from '@angular/core/src/render3/instructions';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  providers: [ HttpService ]
})
export class PayComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  }

  orderAddressUrl: string = `${this.http.baseUrl}order/item.php`;
  orderListUrl: string = `${this.http.baseUrl}cart/item.php`;
  orderPayUrl: string = `${this.http.baseUrl}order/pay.php`;

  oid: any = null;
  orderAddress: any = null;
  orderLsit: string[] = [];
  totalPrice: string = '';

  constructor(
    private http: HttpService,
    private aRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.aRoute.params.subscribe((data: any) => {
      this.oid = data.orderId
    })
    this.getOrderAddress();
    this.getOrderList();
  }

  getOrderAddress() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid).set('oid', this.oid)
      }
      this.http.sendGetMethod(this.orderAddressUrl, httpOptions)
        .subscribe((data: any) => {
          this.orderAddress = data;
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
        })
    }
  }

  orderPay() {
    let httpOptions = {
      params: new HttpParams().set('oid', this.oid)
    }
    this.http.sendGetMethod(this.orderPayUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        alert(data.msg);
      })
  }

  selPayment($event) {
    let paymentElement = $('.pay-platform .col-md-3, .fast-pay .col-md-3, .cod .col-md-3');
    paymentElement.each(function() {
      console.log($(this).css('border'));
      $(this).css('border', '1px solid #e0e0e0');
    })
    $(event.currentTarget).css('border', '1px solid #ff6700');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(this.config, { class: 'pay-modal' })
    );
  }

  goShopping() {
    this.modalRef.hide();
    this.router.navigateByUrl('/index');
  }

  goOrder() {
    this.modalRef.hide();
    this.router.navigateByUrl('/userCenter/orderInfo/myOrder')    
  }
}
