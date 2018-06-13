import { Component, OnInit, ViewChild } from '@angular/core';
import { pcaa } from 'area-data';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
  providers: [ HttpService ]
})
export class MyAddressComponent implements OnInit {
  @ViewChild(ModalDirective) modal: ModalDirective;

  addAddressUrl: string = `${this.http.baseUrl}address/add.php`;
  addressListUrl: string = `${this.http.baseUrl}address/list.php`;
  delAddressUrl: string = `${this.http.baseUrl}address/del.php`;
  addressInfoUrl: string = `${this.http.baseUrl}address/info.php`;
  updateAddressUrl: string = `${this.http.baseUrl}address/update.php`;

  provinces: string[] = [];
  cities: string[] = [];
  selCites: any = null;
  counties: string[] = [];
  addressList: string[] = [];

  receiver: string = '';
  province: string = '-选择省份/自治区-';
  city: string = '-选择城市/地区-';
  county: string = '-选择区县-';
  street: string = '';
  phone: string = '';
  postcode: string = '';

  addressInfo: any = {};

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.provinces = Object.values(pcaa['86']);
    this.getAddressList();
  }

  selectCity(e) {
    let i = e.target.selectedIndex - 1;
    let cityPostcode = Object.keys(pcaa['86']);
    if(i>-1) {
      this.cities = Object.values(pcaa[cityPostcode[i]]);
      this.selCites = pcaa[cityPostcode[i]];
    } else {
      this.cities = [];
      this.selCites = null;
    }
  }

  selectCounty(e) {
    let i = e.target.selectedIndex - 1;
    let countyPostcode = Object.keys(this.selCites);
    if(i>-1) {
      this.counties = Object.values(pcaa[countyPostcode[i]]);
    } else {
      this.counties = [];
    }
  }

  saveAddress() {
    if(this.receiver === '' && this.street === '') {
      return;
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
          .set('receiver', this.receiver)
          .set('province', this.province)
          .set('city', this.city)
          .set('county', this.county)
          .set('street', this.street)
          .set('phone', this.phone)
          .set('postcode', this.postcode)
      };
      this.http.sendGetMethod(this.addAddressUrl, httpOptions)
        .subscribe((data: any) => {
          console.log(JSON.parse(sessionStorage.getItem('userInfo')).uid)
          console.log(data);
        })
    }
  }

  getAddressList() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      };
      this.http.sendGetMethod(this.addressListUrl, httpOptions)
        .subscribe((data:any) => {
          this.addressList = data;
          console.log(data);
        })
    }
  }

  delAddress(aid, event) {
    let httpOptions = {
      params: new HttpParams().set('aid', aid)
    };
    this.http.sendGetMethod(this.delAddressUrl, httpOptions)
      .subscribe((data:any) => {
        console.log(data);
        if(data.code === 200) {
          alert(data.msg);
          $(event.target).parent().remove();
        }
      })
  }

  editAddress(addressInfo) {
    this.modal.show();
    this.addressInfo = addressInfo;
    console.log(addressInfo);
  }
}
