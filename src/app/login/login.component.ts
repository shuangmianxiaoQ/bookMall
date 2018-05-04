import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  loginUrl: string = `${this.httpService.baseUrl}user/login.php`;

  uname: string = '';
  upwd: string = '';

  isShowNameError: boolean = true;
  isShowPwdError: boolean = true;
  isShowLoginError: boolean = true;

  constructor(
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onKeyName() {
    this.isShowNameError = true;
    this.isShowLoginError = true;
  }
  onKeyPwd() {
    this.isShowPwdError = true;
    this.isShowLoginError = true;
  }
  
  userLogin() {
    let loginInfo = {
      uname: this.uname,
      upwd: this.upwd
    };
    this.httpService.sendPostMethod(this.loginUrl, loginInfo)
      .subscribe((data: any) => {
        if (data.code === 401) {
          this.isShowNameError = false;
        } else if (data.code === 402) {
          this.isShowPwdError = false;
        } else if (data.code === 201) {
          this.isShowLoginError = false;
        } else if (data.code === 200) {
          this.router.navigateByUrl('/index');
        }
      });
  }
}
