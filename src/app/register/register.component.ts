import { Component, OnInit, AnimationStyles, TemplateRef } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HttpService]
})
export class RegisterComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: true
  }

  registerUrl: string = `${this.httpService.baseUrl}user/register.php`;
  checkNameUrl: string = `${this.httpService.baseUrl}user/check_uname.php`;
  checkPwdUrl: string = `${this.httpService.baseUrl}user/check_upwd.php`;
  checkEmailUrl: string = `${this.httpService.baseUrl}user/check_email.php`;

  uname: string = '';
  upwd: string = '';
  email: string = '';

  isShowNameError: boolean = true;
  isShowNameTips: boolean = true;
  isCheckNameSuccess: boolean = true;
  isCheckNameError: boolean = true;
  isShowPwdError: boolean = true;
  isShowPwdTips: boolean = true;
  isCheckPwdSuccess: boolean = true;
  isCheckPwdError: boolean = true;
  isCheckConfirmSuccess: boolean = true;
  isCheckConfirmError: boolean = true;
  isShowEmailError: boolean = true;
  isCheckEmailError: boolean = true;
  isCheckEmailSuccess: boolean = true;
  isShowRegister: boolean = true;

  showNameTips: string = '';
  checkNameMsg: string = '';
  showPwdTips: string = '';
  checkPwdMsg: string = '';
  checkEmailMsg: string = '';

  constructor(
    private httpService: HttpService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  onKeyName(event) {
    this.isShowNameError = true;
    this.isCheckNameSuccess = true;
    this.isCheckNameError = true;
    this.isShowRegister = true;
    let nameReg = /^[0-9A-Za-z\u4e00-\u9fff]{4,20}$/;
    let nameTipElement = event.target.parentElement.querySelector('div');
    if(nameReg.test(event.target.value)) {
      this.isShowNameTips = false;
      this.showNameTips = '用户名符合要求';
      nameTipElement.style.color = 'green';
    } else {
      this.isShowNameTips = false;
      this.showNameTips = '用户名不符合要求';
      nameTipElement.style.color = 'red';
    }
  }

  onKeyPwd(event) {
    this.isShowPwdError = true;
    this.isCheckPwdSuccess = true;
    this.isCheckPwdError = true;
    this.isShowRegister = true;
    let pwdReg = /^[0-9A-Za-z]{6,20}$/;
    let pwdTipElement = event.target.parentElement.querySelector('div');
    if(pwdReg.test(event.target.value)) {
      this.isShowPwdTips = false;
      this.showPwdTips = '密码符合要求';
      pwdTipElement.style.color = 'green';
    } else {
      this.isShowPwdTips = false;
      this.showPwdTips = '密码不符合要求';
      pwdTipElement.style.color = 'red';
    }
  }

  onKeyConfirmPwd() {
    this.isCheckConfirmError = true;
    this.isCheckConfirmSuccess = true;
    this.isShowRegister = true;
  }

  onKeyEmail() {
    this.isShowEmailError = true;
    this.isCheckEmailError = true;
    this.isCheckEmailSuccess = true;
    this.isShowRegister = true;
  }

  onFocusName(userInput: string) {
    this.isShowNameTips = false;
    this.showNameTips = '用户名为4-20位字符，由字母、数字和汉字组成';
    if(userInput !== '') {
      this.isShowNameTips = true;
    }
  }

  onFocusPwd(userInput: string) {
    this.isShowPwdTips = false;
    this.showPwdTips = '密码为6-20位字符，由字母和数字组成';
    if(userInput !== '') {
      this.isShowPwdTips = true;
    }
  }

  onBlurName() { this.isShowNameTips = true; }
  onBlurPwd() { this.isShowPwdTips = true; }

  checkName(userInput: string) {
    let httpOptions = {
      params: new HttpParams().set('uname', userInput)
    }
    this.httpService.sendGetMethod(this.checkNameUrl, httpOptions)
      .subscribe((data: any) => {
        if (data.code === 401) {
          this.isShowNameError = false;
        } else if (data.code === 201) {
          this.isCheckNameError = false;
          this.checkNameMsg = data.msg;
        } else if (data.code === 202) {
          this.isCheckNameError = false;
          this.checkNameMsg = data.msg;
        } else if (data.code === 200) {
          this.isCheckNameSuccess = false;
          this.checkNameMsg = data.msg;
        };
      });
  }

  checkPwd(userInput: string) {
    let httpOptions = {
      params: new HttpParams().set('upwd', userInput)
    }
    this.httpService.sendGetMethod(this.checkPwdUrl, httpOptions)
      .subscribe((data: any) => {
        if (data.code === 401) {
          this.isShowPwdError = false;
        } else if (data.code === 201) {
          this.isCheckPwdError = false;
          this.checkPwdMsg = data.msg;
        } else if (data.code === 200) {
          this.isCheckPwdSuccess = false;
          this.checkPwdMsg = data.msg;
        };
      });
  }

  checkConfirmPwd(newPwd: string, oldPwd: string) {
    if(newPwd === oldPwd) {
      this.isCheckConfirmSuccess = false;
    } else {
      this.isCheckConfirmError = false;
    }
  }
  
  checkEmail(userInput: string) {
    let httpOptions = {
      params: new HttpParams().set('email', userInput)
    }
    this.httpService.sendGetMethod(this.checkEmailUrl, httpOptions)
      .subscribe((data: any) => {
        if (data.code === 401) {
          this.isShowEmailError = false;
        } else if (data.code === 201) {
          this.isCheckEmailError = false;
          this.checkEmailMsg = data.msg;
        } else if (data.code === 200) {
          this.isCheckEmailSuccess = false;
          this.checkEmailMsg = data.msg;
        };
      });
  }

  userRegister(template: TemplateRef<any>) {
    if(!(this.isCheckNameError && this.isCheckPwdError && this.isCheckConfirmError && this.isCheckEmailError)) {
      this.isShowRegister = false;
    } else {
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
            this.openModal(template);
          }
        });
    }
  }

  openModal(template) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(this.config, { class: 'pay-modal' })
    );
  }

  ok() {
    this.modalRef.hide();
    this.router.navigateByUrl('/login');
  }
}
