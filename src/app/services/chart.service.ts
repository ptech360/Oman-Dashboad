import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './utilities.storage';

import { SafeHttp } from './safe-http';
declare let google:any;

@Injectable()
export class ChartService {

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
  
  public getComplaintByStatus() {
    return this.safeHttp.get(this.actionUrl+"/"+ this._configuration.getManagementRole()+"/" + this._configuration.getManagementId() +"/complaint/status").then(res => {
        return res;
      })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }
  
  public getComplaintByCategoryAndStatus() {
    return this.safeHttp.get(this.actionUrl+"/"+ this._configuration.getManagementRole()+"/" + this._configuration.getManagementId() +"/complaint/category-status").then(res => {
        return res;
      })
      .catch(err => {
        if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
      });
  }
  
  public getComplaintByStatusId(statusId){
    return this.safeHttp.getWithoutHeaders(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/complaint/status/"+statusId)
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    })
  }
  
  public getComplaintByCategoryId(categoryId){
    return this.safeHttp.getWithoutHeaders(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/complaint/category-status/category/"+categoryId)
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    })
  }
  
    public getComplaintByCategoryAndStatusId(categoryId,statusId){
    return this.safeHttp.getWithoutHeaders(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/complaint/category-status/"+categoryId+"/"+statusId)
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    })
  }
  
  public getComplaintOfProgram(){
    return this.safeHttp.get(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/complaint/program-standard")
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    });
  }
  public getBelowPerfomanceOfProgram(){
    return this.safeHttp.get(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/below-performer/program")
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    });
  }
  public getBelowPerfomanceOfProgramById(programId){
    return this.safeHttp.get(this.actionUrl+"/"+this._configuration.getManagementRole()+"/"+this._configuration.getManagementId()+"/below-performer/program/"+programId)
    .then(res =>{
      return res;
    })
    .catch(err =>{
      if (err.status == 0) {
          this.safeHttp.ErrorMessage();
        } else {
          return Promise.reject(err);
        }
    });
  }
}