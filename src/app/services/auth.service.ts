import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './utilities.storage';

import { SafeHttp } from './safe-http';


@Injectable()
export class AuthService {

  private actionUrl: string;
  private access_token: string;
  private data;
  public header;

  constructor(private _http: Http,
    private safeHttp: SafeHttp,
    private _configuration: Configuration) {
    this.actionUrl = _configuration.Server;
    this.header = _configuration.header();
  }

  public getManagement(values:any) {
    this.data = {
      username: values.username,
      password: values.password
    }
    return this._http.post(this.actionUrl + "/login", this.data)
      .toPromise()
      .then(response => {

        this.access_token = response.json().access_token;
        localStorage.setItem('access_token', response.json().access_token);
        return Promise.resolve(response)
      })
      .catch(err => {
        console.log("Error in Getting Management", err)
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }



  public getManagementInfo() {
    return this.safeHttp.get(this.actionUrl + "/management/info")
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      })
  }

  public storeManagementData(management) {
    localStorage.setItem("id", management.id);
    localStorage.setItem("name", management.name);
    localStorage.setItem("email", management.email);
    localStorage.setItem("contactNo", management.contactNo);
    localStorage.setItem("classTeacher", management.classTeacher);
    localStorage.setItem("username", management.username);
    localStorage.setItem("nickName", management.nickName);
    localStorage.setItem('role', management.role);
  }

}
