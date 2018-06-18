import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-unaccepted-order',
  templateUrl: './unaccepted-order.component.html',
  styleUrls: ['./unaccepted-order.component.css'],
  providers: [ HttpService ]
})
export class UnacceptedOrderComponent implements OnInit {
  orderInfoUrl: string = `${this.http.baseUrl}order/info.php`;

  unacceptedOrder: any = null;
  oid: any = null;

  constructor(private http: HttpService) { }

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
          this.unacceptedOrder = data['unaccepted'];
        })
    }
  }
  
  jumpToDetail(gid) {
    open('/details/'+gid, '_blank');
  }
}
