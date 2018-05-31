import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
  providers: [ HttpService ]
})
export class MyInfoComponent implements OnInit {
  getUserUrl: string = `${this.http.baseUrl}user/get_user.php`;
  updateBasicUrl: string = `${this.http.baseUrl}user/update_basic.php`;
  userInfo: any = null;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getUserInfo();
  }
  
  getUserInfo() {
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
    };
    this.http.sendGetMethod(this.getUserUrl, httpOptions)
      .subscribe((data: any) => {
        this.userInfo = data;
      });
  }

  saveBasic() {
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
        .set('user_name', this.userInfo.user_name)
        .set('phone', this.userInfo.phone)
        .set('gender', this.userInfo.gender)
    };
    this.http.sendGetMethod(this.updateBasicUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
      })
  }
}
