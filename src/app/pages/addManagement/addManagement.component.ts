import {Component, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/formValidation.service';
import { AddManagementFormData } from './addManagement.interface';
import { SafeHttp } from '../../services/safe-http';
import { Configuration } from '../../services/utilities.storage';
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./addManagement.scss')],
  template: require('./addManagement.html')
})
export class AddManagement {
  addManagementForm: FormGroup;
  model: AddManagementFormData;
  submitted: boolean = false;
  enteredName: string;
  enteredUserName: string;
  enteredNickName: string;
  enteredEmail: string = 'example@gmail.com';
  enteredPassword: string;
  enteredPhoneNumber: string;
  public jQuery: any;
  serverObj: any;
  subjects: any;
  standards: any;
  arr: Array<number> = [1];
  selectedClass: any = { 'id': 1 };
  selectedSubject: any = { 'id': 2 };
  isTeacher: boolean = false;
  standarTeacherSubjectForTeacher: Array<Object> = [];
  stdId: number;
  subId: number;
  myDisplayArray: Array<Object> = [];
  myDisplayArrayObj: any;


  constructor(private formBuilder: FormBuilder, private safeHttp: SafeHttp, private configuration: Configuration, private _notificationsService: NotificationsService) {

    this.addManagementForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      nickName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('[2-9]{2}[0-9]{8}$')]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]]
    });
    this.getSubjects();
    this.getStandards();
  }
  showPassword() {
    console.log("showing password");
    jQuery('#showPassword').attr('type', 'text');
  }

  addAnotherForm() {
    this.isTeacher = false;
    this.myDisplayArray = [];
    this.enteredName = '';
    this.enteredUserName = '';
    this.enteredNickName = '';
    this.enteredPhoneNumber = '';
    this.enteredEmail = '';
    this.enteredPassword = '';

    this.addManagementForm = this.formBuilder.group({
      name: ['', Validators.required],
      userName: ['',Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      nickName: ['', Validators.required],
      phoneNo: ['', [Validators.required, Validators.pattern('[2-9]{2}[0-9]{8}$')]],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]]
    })
    this.submitted = false;
  }

  addManagementData() {
    console.log(this.enteredName);
    this.cleanObject(this.myDisplayArray);
    this.serverObj = {
      name: this.enteredName,
      username: this.enteredUserName,
      nickName: this.enteredNickName,
      contactNo: this.enteredPhoneNumber,
      email: this.enteredEmail,
      password: this.enteredPassword,
      standardTeacherSubjectForTecher: this.standarTeacherSubjectForTeacher
    }

    console.log(this.serverObj);
    this.submitted = true;
    this.safeHttp.post(this.configuration.Server + "/employee", this.serverObj).then((data) => {
      console.log("inside notification");
      this.submitted = true;
    }).catch((err) => {
      console.log("thisis the error", err);
    });
  }

  getSubjects() {
    this.safeHttp.get(this.configuration.Server + "/subject").then((data) => {
      console.log("Subjects are", data);
      this.subjects = data;
    }).catch((err) => {
      console.log("thisis the error", err);
    });
  }

  getStandards() {
    this.safeHttp.get(this.configuration.Server + "/standard").then((data) => {
      console.log("Standards are", data);
      this.standards = data;
    }).catch((err) => {
      console.log("thisis the error", err);
    });
  }
  addAnotherEntry() {
    this.arr.push(1);
    this.myDisplayArrayObj = {
      subjectId: this.selectedSubject.id,
      subjectName: this.selectedSubject.name,
      standardId: this.selectedClass.id,
      standardName: this.selectedClass.name
    }
    this.myDisplayArray.push(this.myDisplayArrayObj);
    console.log(this.myDisplayArray);
    this._notificationsService.success(
      "Successfully Added",
      "Added",
      {
        timeOut: 2000,
        showProgressBar: false,
        pauseOnHover: false,
        clickToClose: true,
        maxLength: 80
      }
    );
    this.selectedClass = '';
    this.selectedSubject = '';
    this.arr.shift();

  }

  teacherPresence(flag: boolean) {
    this.isTeacher = true;
    console.log(flag);
  }

  removeStandardAndClass(obj: any) {
    for (var i = 0; i < this.myDisplayArray.length; i++) {
      if (((this.myDisplayArray[i]['standardId']) == (obj['standardId']))) {
        if (((this.myDisplayArray[i]['subjectId']) == (obj['subjectId']))) {
          console.log(this.myDisplayArray.splice(i, 1));
        }
      }

    }
  }

  cleanObject(ar: any) {
    this.standarTeacherSubjectForTeacher = ar.map(function(obj) {
      return { standardId: obj.standardId, subjectId: obj.subjectId };
    });
    console.log("Array After Cleaning", this.myDisplayArray);
  }

}
