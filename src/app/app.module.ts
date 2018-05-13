import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './/app-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HeaderComponent} from './header/header.component';
import {IndexComponent} from './index/index.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SuccessModalComponent} from './register/success-modal/success-modal.component';
import {CarouselComponent} from './index/carousel/carousel.component';
import {CategoryComponent} from './index/category/category.component';
import {RankComponent} from './index/rank/rank.component';
import {NewArrivalComponent} from './index/new-arrival/new-arrival.component';
import { TopSaleComponent } from './index/top-sale/top-sale.component';
import { TimestampPipe } from './timestamp.pipe';
import { RecommendedComponent } from './index/recommended/recommended.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    IndexComponent,
    NotFoundComponent,
    SuccessModalComponent,
    CarouselComponent,
    CategoryComponent,
    RankComponent,
    NewArrivalComponent,
    TopSaleComponent,
    TimestampPipe,
    RecommendedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}