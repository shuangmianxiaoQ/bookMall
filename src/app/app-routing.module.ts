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

const routes : Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
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
        path: '',
        redirectTo: 'noList',
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
      }
    ]
  }, {
    path: 'cart',
    component: CartComponent
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