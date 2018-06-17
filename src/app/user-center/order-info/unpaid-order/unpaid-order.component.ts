import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-unpaid-order',
  templateUrl: './unpaid-order.component.html',
  styleUrls: ['./unpaid-order.component.css'],
  providers: [HttpService]
})
export class UnpaidOrderComponent implements OnInit {
  modalRef: BsModalRef;

  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;
  orderCancelUrl: string = `${this.http.baseUrl}order/cancel.php`;

  unpaidOrder: any = null;
  oid: any = null;

  constructor(
    private http: HttpService,
    private modalService: BsModalService
  ) { }

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
          this.unpaidOrder = data['unpaid'];
        })
    }
  }
  
  jumpToDetail(gid) {
    open('/details/'+gid, '_blank');
  }

  openModal(template: TemplateRef<any>, oid) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.oid = oid;
  }

  ok(): void {
    this.cancelOrder();
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
}
