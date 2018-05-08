import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HeaderComponent} from './header/header.component';
import {IndexComponent} from './index/index.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {CarouselComponent} from './index/carousel/carousel.component';

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
    path: 'header',
    component: HeaderComponent
  }, {
    path: 'carousel',
    component: CarouselComponent
  }, {
    path: 'index',
    component: IndexComponent
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