import { Component, OnInit, AnimationStyles } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HttpService]
})
export class RegisterComponent implements OnInit {
  registerUrl: string = `${this.httpService.baseUrl}user/register.php`;
  checkNameUrl: string = `${this.httpService.baseUrl}user/check_uname.php`;

  uname: string = '';
  upwd: string = '';
  email: string = '';

  isShowNameError: boolean = true;
  isShowPwdError: boolean = true;
  isShowEmailError: boolean = true;
  isCheckNameSuccess: boolean = true;
  isCheckNameError: boolean = true;
  checkNameMsg: string = '';

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onKeyName() {
    this.isShowNameError = true;
    this.isCheckNameSuccess = true;
    this.isCheckNameError = true;
  }

  onKeyPwd() {
    this.isShowPwdError = true;
    let pwdReg = /^[0-9A-Za-z]{6,20}$/;
  }

  onKeyEmail() {
    this.isShowEmailError = true;
  }

  checkName(userInput: string) {
    let httpOptions = {
      params: new HttpParams().set('uname', userInput)
    }
    this.httpService.sendGetMethod(this.checkNameUrl, httpOptions)
      .subscribe((data: any) => {
        console.log(data);
        if (data.code === 401) {
          this.isShowNameError = false;
        } else if (data.code === 201) {
          this.isCheckNameSuccess = false;
          this.checkNameMsg = data.msg;
        } else if (data.code === 200) {
          this.isCheckNameError = false;
          this.checkNameMsg = data.msg;
        };
      });
  }
  
  userRegister() {
    let newUser = {
      uname: this.uname,
      upwd: this.upwd,
      email: this.email
    };
    this.httpService.sendPostMethod(this.registerUrl, newUser)
      .subscribe((data: any) => {
        if (data.code === 401) {
          this.isShowNameError = false;
        } else if (data.code === 402) {
          this.isShowPwdError = false;
        } else if (data.code === 403) {
          this.isShowEmailError = false;
        } else if (data.code === 200) {
          this.router.navigateByUrl('/login');
        }
      });
  }
}
