import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {IndexComponent} from './index/index.component';
import {ListComponent} from './list/list.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CategoryListComponent} from './list/category-list/category-list.component';
import {SearchListComponent} from './list/search-list/search-list.component';

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
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}