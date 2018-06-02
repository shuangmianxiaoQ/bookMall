import { Component, OnInit } from '@angular/core';
import { pcaa } from 'area-data';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css'],
  providers: [ HttpService ]
})
export class MyAddressComponent implements OnInit {
  addAddressUrl: string = `${this.http.baseUrl}address/add.php`;
  provinces: string[] = [];
  cities: string[] = [];
  selCites: any = null;
  counties: string[] = [];

  receiver: string = '';
  province: string = '-选择省份/自治区-';
  city: string = '-选择城市/地区-';
  county: string = '-选择区县-';
  street: string = '';
  phone: string = '';
  postcode: string = '';

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.provinces = Object.values(pcaa['86']);
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
}
