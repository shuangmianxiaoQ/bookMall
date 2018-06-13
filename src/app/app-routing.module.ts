import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {IndexComponent} from './index/index.component';
import {ListComponent} from './list/list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CategoryListComponent} from './list/category-list/category-list.component';
import {SearchListComponent} from './list/search-list/search-list.component';
import {DetailsComponent} from './details/details.component';
import {UserCenterComponent} from './user-center/user-center.component';
import {MyInfoComponent} from './user-center/user-info/my-info/my-info.component';
import {UserSafetyComponent} from './user-center/user-info/user-safety/user-safety.component';
import {MyAddressComponent} from './user-center/user-info/my-address/my-address.component';
import {CartComponent} from './cart/cart.component';
import {OrderComponent} from './order/order.component';
import {PayComponent} from './pay/pay.component';
import {MyOrderComponent} from './user-center/order-info/my-order/my-order.component';
import {UnpaidOrderComponent} from './user-center/order-info/unpaid-order/unpaid-order.component';
import {UnacceptedOrderComponent} from './user-center/order-info/unaccepted-order/unaccepted-order.component';
import {CancelledOrderComponent} from './user-center/order-info/cancelled-order/cancelled-order.component';

const routes : Routes = [
  {
    path: '',
    component: IndexComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  }, {
    path: 'index',
    component: IndexComponent
  }, {
    path: 'list',
    component: ListComponent,
    children: [
      {
        path: 'searchList',
        redirectTo: 'searchList/ ',
        pathMatch: 'full'
      }, {
        path: 'searchList/:keyword',
        component: SearchListComponent
      }, {
        path: 'categoryList/:typeId',
        component: CategoryListComponent
      }
    ]
  }, {
    path: 'details/:goodsId',
    component: DetailsComponent
  }, {
    path: 'userCenter',
    component: UserCenterComponent,
    children: [
      {
        path: 'userInfo/myInfo',
        component: MyInfoComponent
      }, {
        path: 'userInfo/userSafety',
        component: UserSafetyComponent
      }, {
        path: 'userInfo/myAdderss',
        component: MyAddressComponent
      }, {
        path: 'orderInfo/myOrder',
        component: MyOrderComponent
      }, {
        path: 'orderInfo/unpaidOrder',
        component: UnpaidOrderComponent
      }, {
        path: 'orderInfo/unacceptedOrder',
        component: UnacceptedOrderComponent
      }, {
        path: 'orderInfo/cancelledOrder',
        component: CancelledOrderComponent
      }
    ]
  }, {
    path: 'cart',
    component: CartComponent
  }, {
    path: 'order',
    component: OrderComponent
  }, {
    path: 'pay/:orderId',
    component: PayComponent
  }, {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}