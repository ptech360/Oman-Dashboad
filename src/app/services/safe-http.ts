import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './utilities.storage';


@Injectable()
export class SafeHttp {

  private access_token;
  private headers;

  constructor(private http: Http,

    private _configuration: Configuration
  ) { }

  public ErrorMessage() {
    console.log("Internal Server Error");
  }

  public CustomErrorMessage() {
    console.log("custom error presence");
  }

  get(url: string, options?: RequestOptions): Promise<any> {
    this.access_token = this._configuration.getAccessToken();
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.access_token
    });


    var options = new RequestOptions({
      headers: this.headers
    });

    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      }, function(err) {
        console.log('err1', err)
        return Promise.reject(err || 'Server error');
      });
  }

  getWithoutHeaders(url: string, options?: RequestOptions): Promise<any> {
    this.headers = new Headers({
      'isWeb': 'true'
    });
    var options = new RequestOptions({
      headers: this.headers
    });
    return this.http.get(url, options)
      .toPromise()
      .then(response => {
        return Promise.resolve(response.json());
      }, function(err) {
        console.log('err1', err)
        return Promise.reject(err || 'Server error');
      });
  }

  post(url: string, body: string, options?: RequestOptions) {

    this.access_token = this._configuration.getAccessToken();

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.access_token,
      'isWeb': 'true'
    });

    var options = new RequestOptions({
      headers: this.headers
    });

    return this.http.post(url, body, options)
      .toPromise()
      .then(res => {
        return Promise.resolve(res);
      }, function(err) {
        console.log("err2", err);
        return Promise.reject(err || 'Server error');
      });
  }

  put(url: string, body: any, options?: RequestOptions) {

    this.access_token = this._configuration.getAccessToken();

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.access_token,
      'isWeb' : 'true'
    });
    // this.headers = new Headers({
    //   'isWeb' : 'true'
    // });

    var options = new RequestOptions({
      headers: this.headers
    });

    return this.http.put(url, body, options)
      .toPromise()
      .then(res => {
        return Promise.resolve(res);
      }, function(err) {
        console.log("err2", err);
        return Promise.reject(err || 'Server error');
      });
  }

}
