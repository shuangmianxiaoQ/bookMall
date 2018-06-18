import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { HttpService } from '../../../http.service';
import { OrderInfoService } from '../order-info.service';
import { HttpParams } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
  providers: [ HttpService, OrderInfoService ]
})
export class MyOrderComponent implements OnInit {
  modalRef: BsModalRef;

  @Input() orderInfos: any;

  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;
  orderCancelUrl: string = `${this.http.baseUrl}order/cancel.php`;
  delOrderUrl: string = `${this.http.baseUrl}order/del.php`;

  allOrder: any = null;
  oid: any = null;

  constructor(
    private orderInfo: OrderInfoService,
    private http: HttpService,
    private modalService: BsModalService
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
    if(userInfo) {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      }
      this.http.sendGetMethod(this.orderInfoUrl, httpOptions)
        .subscribe((data: any) => {
          this.allOrder = data['all'];
        })
    }
  }
  
  jumpToDetail(gid) {
    open('/details/'+gid, '_blank');
  }

  openModal1(template: TemplateRef<any>, oid) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.oid = oid;
  }

  openModal2(template: TemplateRef<any>, oid) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.oid = oid;
  }

  ok1(): void {
    this.cancelOrder();
    this.modalRef.hide();
  }

  ok2(): void {
    this.delOrder();
    this.modalRef.hide();
  }
 
  cancel(): void {
    this.modalRef.hide();
  }

  cancelOrder() {
    let httpOptions = {
      params: new HttpParams().set('oid', this.oid)
    }
    this.http.sendGetMethod(this.orderCancelUrl, httpOptions)
      .subscribe((data: any) => {
        this.getOrderInfo();
      })
  }

  delOrder() {
    let httpOptios = {
      params: new HttpParams().set('oid', this.oid)
    }
    this.http.sendGetMethod(this.delOrderUrl, httpOptios)
      .subscribe((data: any) => {
        this.getOrderInfo();
      })
  }
}
