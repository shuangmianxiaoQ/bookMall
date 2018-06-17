import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ HttpService ]
})
export class CartComponent implements OnInit {
  modalRef: BsModalRef;

  cartListUrl: string = `${this.http.baseUrl}cart/item.php`;
  updateCountUrl: string = `${this.http.baseUrl}cart/update_count.php`;
  delItemUrl: string = `${this.http.baseUrl}cart/del.php`;

  cartItems: string[] = [];
  totalPrice: string = '';
  cid: any = null;

  constructor(
    private http: HttpService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getCartList();
  }

  getCartList() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      }
      this.http.sendGetMethod(this.cartListUrl, httpOptions)
        .subscribe((data: any) => {
          this.cartItems = data['cartItems'];
          this.totalPrice = data['total'];
        })
    }
  }

  modifyCount(cid, val, bool) {
    if(bool) {
      val = parseInt(val) + 1;
      this.updateCount(cid, val);
    } else {
      if(parseInt(val) > 1) {
        val = parseInt(val) - 1;
        this.updateCount(cid, val);
      }
    }
  }

  editCount(cid, val) {
    this.updateCount(cid, val);
  }

  updateCount(cid, count) {
    let httpOptions = {
      params: new HttpParams().set('cid', cid).set('count', count)
    }
    if(parseInt(count) > 0) {
      this.http.sendGetMethod(this.updateCountUrl, httpOptions)
        .subscribe((data: any) => {
          this.getCartList();
        })
    }
  }

  openModal(template: TemplateRef<any>, cid) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.cid = cid;
  }

  ok(): void {
    this.delItem();
    this.modalRef.hide();
  }
  cancel(): void {
    this.modalRef.hide();
  }

  delItem() {
    let httpOptions = {
      params: new HttpParams().set('cid', this.cid)
    }
    this.http.sendGetMethod(this.delItemUrl, httpOptions)
      .subscribe((data: any) => {
        if(data.code === 200) {
          this.getCartList();
        }
      })
  }

  jumpToDetail(gid) {
    open('/details/'+gid, '_blank');
  }
}
