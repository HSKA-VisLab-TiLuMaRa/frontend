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
  // private GRANT_TYPE: string = 'Authorization Code';

  private token: string;
  private adminToken: string;
  private baseurl: string = 'http://localhost:8081/API/public/api/';
  private authUrl: string = 'http://localhost:8099/dialog/authorize';
  private accessTokenUrl: string = 'http://localhost:8099/oauth/token';
  // private baseurl: string = 'https://api.competeleague.com/entity/';
  // private baseurl: string = 'http://localhost:9000/API/entity/'; // for local API / DB access
  // private baseurl: string = 'http://localhost:9999/api/entity/'; // for local API / DB access
  // private jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private http: Http
  ) {
    this.http = http;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token;
  }

  createAuthorizationHeader(headers: Headers) {
    if (this.token) {
      headers.append('Authorization', 'Bearer ' + this.token);
    }
  }

  handleError(err: string) {
    // works but throws error on console... returning e.json() aint correct...
    // this.dispatcher.dispatch(loadFeedback({
    //     title: 'An Error occured!',
    //     type: 'cl-fail',
    //     text: err
    // }));
  }

  login() {
    const tokenHeader = new Headers({
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET)
    });
    const request = new HttpParams()
      .set('grant_type', 'code')
      // .set('scope', '0')
      // .set('username', email)
      // .set('password', password)
      .toString();
    this.http
      .post(this.accessTokenUrl, request, { headers: tokenHeader })
      .subscribe(
      tokenData => {
        console.log('LOGIN: Data received.');
        // console.log(tokenData);
        this.setToken(tokenData['access_token']);
        console.log('Access token:', this.token);
        //
        // const userHeader = new HttpHeaders({
        //   'Cache-Control': 'no-cache',
        //   'Authorization': this.getBearerToken()
        // });

        // this.http
        //   .get(authConfig.userEndpoint, { headers: userHeader })
        //   .subscribe(
        //   userData => {
        //     console.log('USER ROLE: Data received.');
        //     // console.log(userData);
        //     this.userRole = userData['authorities'][0]['authority'];
        //     console.log('Role:', this.userRole);
        //     this.redirect();
        //   },
        //   userError => {
        //     console.error('USER ROLE: Error.');
        //     console.error(userError);
        //   },
        //   () => console.log('USER ROLE: Done.')
        //   );
      },
      tokenError => {
        console.error('LOGIN: Error.');
        console.error(tokenError);
      },
      () => console.log('LOGIN: Done.')
      );
  }

  get(url: string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseurl + url, {
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
    let headers = new Headers(
      { 'Content-Type': 'application/json' }
    );
    this.createAuthorizationHeader(headers);
    return this.http.post(this.baseurl + url, data, {
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
      { 'Content-Type': 'application/json' }
    );
    this.createAuthorizationHeader(headers);
    return this.http.put(this.baseurl + url, data, {
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
      { 'Content-Type': 'application/json' }
    );
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.baseurl + url, {
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
