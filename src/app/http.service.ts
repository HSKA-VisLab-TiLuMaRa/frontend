import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { JwtHelper } from 'angular2-jwt';

// import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  private CLIENT_ID: string = "xyz123";
  private CLIENT_SECRET: string = "ssh-password";
  private GRANT_TYPE: string = 'code';

  private token: string;
  private adminToken: string;
  private baseurl: string = 'http://localhost:8081/API/public/api/';
  private authUrl: string = 'http://localhost:8099/dialog/authorize';
  private loginUrl: string = 'http://localhost:8099/login';
  private accessTokenUrl: string = 'http://localhost:8099/oauth/token';

  constructor(
    private http: Http
  ) {
    this.http = http;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    console.log('TOKEN', token);
    this.token = token;
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    if (this.token !== 'null') {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.token;
  }

  createAuthorizationHeader(headers: Headers) {
    console.log('HEADERS', this.token, typeof this.token);
    if (this.token !== 'null' && this.token !== null && this.token !== undefined && this.token !== 'undefined') {
      headers.append('Authorization', 'Bearer ' + this.token);
    }
    return headers;
  }

  handleError(err: string) {
    // works but throws error on console... returning e.json() aint correct...
    // this.dispatcher.dispatch(loadFeedback({
    //     title: 'An Error occured!',
    //     type: 'cl-fail',
    //     text: err
    // }));
  }

  login(username: string, password: string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
    });
    const body = {
      "grant_type": "password",
      "password": password,
      "username": username
    };
    let self: any = this;
    return this.http
      .post(this.accessTokenUrl, body, { headers: headers });
    // .subscribe((res: any) => {
    //   console.log('RES', res);
    //   self.setToken(res._body.access_token);
    // });
  }

  get(url: string) {
    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    }).catch(e => {
      this.handleError(e.json().error_msg);
      return Observable.throw(e);
    }).map((res: any) => {
      if (res.status !== 204) {
        return res.json()
      } else {
        return res;
      }
    });
  }

  post(url: string, data: any) {
    let headers = new Headers({
      // 'Content-Type': 'application/json'
    });
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    }).catch(e => {
      this.handleError(e.json().error_msg);
      return Observable.throw(e);
    }).map((res: any) => {
      if (res.status !== 204) {
        return res.json()
      } else {
        return res;
      }
    });
  }

  put(url: string, data: any) {
    let headers = new Headers(
      // { 'Content-Type': 'application/json' }
    );
    headers = this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    }).catch(e => {
      this.handleError(e.json().error_msg);
      return Observable.throw(e);
    }).map((res: any) => {
      if (res.status !== 204) {
        return res.json()
      } else {
        return res;
      }
    });
  }
  // data:any
  delete(url: string) {
    let headers = new Headers(
      // { 'Content-Type': 'application/json' }
    );
    headers = this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    }).catch(e => {
      this.handleError(e.json().error_msg);
      return Observable.throw(e);
    }).map((res: any) => {
      if (res.status !== 204) {
        return res.json()
      } else {
        return res;
      }
    });
  }

}
