import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
}

@Injectable()
export class HttpService {
  baseUrl : string = 'http://localhost/bookMall/api/';

  constructor(private http : HttpClient) {}

  // 解决php服务器获取不到HttpClient的POST请求传来的参数问题
  transformRequest(data: any) {
    var str = '';
    for (var i in data) {
    str += `${i}=${data[i]}&`;
    }
    return str.slice(0, -1)
  };

  // 发送POST请求
  sendPostMethod(url : string, body : any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(url, this.transformRequest(body), httpOptions);
  }

  // 发送GET请求
  sendGetMethod(url: string, options: any) {
    return this.http.get(url, options);
  }
}
