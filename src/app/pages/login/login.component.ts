import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService  } from '../../services/auth.service';
import { Router }  from '@angular/router';


@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public userDoesntExist: boolean ;

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder , private authService:AuthService , private router:Router) {
    this.userDoesntExist = false;
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern('^[a-zA-Z][a-zA-Z0-9.,$;]+$')])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
//If token present go to dashboard
  if(window.localStorage.getItem("access_token")){
    console.log("token hain ");
      this.router.navigateByUrl(`/pages/dashboard`);
  }

  }

  public onSubmit(values:Object):void {
    this.submitted = false;
    if (this.form.valid) {





      this.authService.getManagement(values)
      .then(user =>{
        console.log("i Got this user", user);
        this.authService.getManagementInfo().then(data =>{
          console.log("data i got about mangemnt is ",data);
        this.authService.storeManagementData(data);

      });
      this.router.navigateByUrl(`/pages/dashboard`);
      })
      .catch(err =>{
        this.userDoesntExist = true;

        console.log("user not exist",err);
      });





    }
  }
}
