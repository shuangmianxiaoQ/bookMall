import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './/app-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

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
import {TopSaleComponent} from './index/top-sale/top-sale.component';
import {TimestampPipe} from './timestamp.pipe';
import {RecommendedComponent} from './index/recommended/recommended.component';
import {FooterComponent} from './footer/footer.component';
import {StringToHtmlPipe} from './index/recommended/string-to-html.pipe';
import {ListComponent} from './list/list.component';
import {CategoryListComponent} from './list/category-list/category-list.component';
import {SearchListComponent} from './list/search-list/search-list.component';
import {DetailsComponent} from './details/details.component';
import {ParseHtmlPipe} from './details/parse-html.pipe';
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

library.add(fas);

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
    RecommendedComponent,
    FooterComponent,
    StringToHtmlPipe,
    ListComponent,
    CategoryListComponent,
    SearchListComponent,
    DetailsComponent,
    ParseHtmlPipe,
    UserCenterComponent,
    MyInfoComponent,
    UserSafetyComponent,
    MyAddressComponent,
    CartComponent,
    OrderComponent,
    PayComponent,
    MyOrderComponent,
    UnpaidOrderComponent,
    UnacceptedOrderComponent,
    CancelledOrderComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ModalModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}