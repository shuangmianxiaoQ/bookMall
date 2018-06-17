import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.css'],
  providers: [HttpService]
})
export class CancelledOrderComponent implements OnInit {
  modalRef: BsModalRef;

  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;
  delOrderUrl: string = `${this.http.baseUrl}order/del.php`;

  cancelledOrder: any = null;
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
          this.cancelledOrder = data['cancelled'];
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
    this.delOrder();
    this.modalRef.hide();
  }
 
  cancel(): void {
    this.modalRef.hide();
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
