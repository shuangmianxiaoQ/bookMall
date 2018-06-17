import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../http.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-safety',
  templateUrl: './user-safety.component.html',
  styleUrls: ['./user-safety.component.css'],
  providers: [ HttpService ]
})
export class UserSafetyComponent implements OnInit {
  userInfoUrl: string = `${this.http.baseUrl}user/get_user.php`;
  updateUpwdUrl: string = `${this.http.baseUrl}user/update_upwd.php`;

  oldPwd: string = '';
  newPwd: string = '';
  confirmPwd: string = '';
  isShowTips: boolean = true;

  password: string = '';

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    if(!userInfo) {
      alert('用户未登录！');
    } else {
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
      };
      this.http.sendGetMethod(this.userInfoUrl, httpOptions)
        .subscribe((data: any) => {
          this.password = data.upwd;
        })
    }
  }

  checkPwd() {
    if(this.oldPwd !== this.password) {
      this.isShowTips = false;
    }
  }

  onInput() {
    this.isShowTips = true;
  }

  savePwd() {
    if(this.oldPwd === '' || this.newPwd === '' || this.confirmPwd === '') {
      alert('请填写完整所有字段');
    } else if(this.isShowTips === false) {
      alert('输入的密码与原密码不一致');
    } else if(this.newPwd.length < 6) {
      alert('新密码长度至少为6位');
    } else if(this.oldPwd === this.newPwd) {
      alert('新密码与原密码相同');
    } else if(this.newPwd !== this.confirmPwd) {
      alert('新密码和确认密码两次输入不一致');
    } else {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      let httpOptions = {
        params: new HttpParams().set('uid', userInfo.uid)
          .set('old_pwd', this.oldPwd)
          .set('new_pwd', this.newPwd)
      };
      this.http.sendGetMethod(this.updateUpwdUrl, httpOptions)
        .subscribe((data: any) => {
          alert(data.msg);
        })
    }
  }
}
