import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class Configuration {

  public headers = new Headers({
    'Content-Type' : 'application/json',
    'Authorization' : 'Bearer ' + localStorage.getItem("access_token")
  });

  header() {
    return this.headers;
  }

  public getManagementId(): string {
    if (localStorage.getItem("id") != null) {
      return localStorage.getItem("id");
    }
  }

  public getManagementRole(): string {
    if (localStorage.getItem("role") != null) {
      return localStorage.getItem("role");
    }
  }

  static getManagementRolePresent(): string {
    if (localStorage.getItem("role") != null) {
      return localStorage.getItem("role");
    }
  }

  public getAccessToken(): string {
    if (localStorage.getItem("access_token") != null) {
      return localStorage.getItem("access_token");
    }
    else{
      
    }
  }

  public Server: string = "https://nxtlifeyugmasrgsrkv4.appspot.com";

  // public ComplaintUrl(): string {
  //   return this.Server + "/parent/" + this.getParentId() + "/complaint";
  // }

}
