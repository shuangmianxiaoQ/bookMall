import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class OrderInfoService {
  private orderInfo = new Subject();
  orderInfo$ = this.orderInfo.asObservable();

  addData(data: any) {
    this.orderInfo.next(data);
  }
}
