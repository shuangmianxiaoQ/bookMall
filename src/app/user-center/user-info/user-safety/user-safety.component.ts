import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-user-safety',
  templateUrl: './user-safety.component.html',
  styleUrls: ['./user-safety.component.css'],
  providers: [ HttpService ]
})
export class UserSafetyComponent implements OnInit {
  updateUpwdUrl: string = `${this.http.baseUrl}user/update_upwd.php`;
  oldPwd: string = '';
  newPwd: string = '';

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  savePwd() {
    let httpOptions = {
      params: new HttpParams().set('uid', JSON.parse(sessionStorage.getItem('userInfo')).uid)
        .set('old_pwd', this.oldPwd)
        .set('new_pwd', this.newPwd)
    };
    this.http.sendGetMethod(this.updateUpwdUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
      })
  }
}
