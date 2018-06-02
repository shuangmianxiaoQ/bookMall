import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ HttpService ]
})
export class CartComponent implements OnInit {
  cartListUrl: string = `${this.http.baseUrl}cart/item.php`;
  updateCountUrl: string = `${this.http.baseUrl}cart/update_count.php`;
  delItemUrl: string = `${this.http.baseUrl}cart/del.php`;

  cartItems: string[] = [];
  totalPrice: string = '';

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getCartList();
  }

  getCartList() {
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
    }
    this.http.sendGetMethod(this.cartListUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        this.cartItems = data['cartItems'];
        this.totalPrice = data['total'];
      })
  }

  modifyCount(cid, event, bool) {
    let inputElement = $(event.target).parent().find('input');
    let count: any = inputElement.val();
    if(bool) {
      count = parseInt(count) + 1;
      inputElement.val(count);
    } else {
      if(parseInt(count) > 1) {
        count = parseInt(count) - 1;
        inputElement.val(count);
      }
    }
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
      .set('cid', cid)
      .set('count', count)
    }
    if(parseInt(count) > 1) {
      this.http.sendGetMethod(this.updateCountUrl, httpOptions)
        .subscribe((data: any) => {
          console.log(data);
          this.computedTotalCount();
        })
    }
  }

  delItem(cid, event) {
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
        .set('cid', cid)
    }
    this.http.sendGetMethod(this.delItemUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        if(data.code === 200) {
          $(event.target).parent().parent().remove();
          this.computedTotalCount();
        }
      })
  }

  // 修改数量或删除商品时计算总价
  computedTotalCount() {
    let subTotalEelment = $('.sub-total');
    let sum = 0;
    $('.sub-total').each(function() {
      sum += parseFloat($(this).text().slice(1));
    })
    this.totalPrice = String(sum);
  }
}
