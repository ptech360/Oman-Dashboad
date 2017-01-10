import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import { SafeHttp } from '../../services/safe-http';
import { Configuration } from '../../services/utilities.storage';
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Params }   from '@angular/router';



export interface edittedComplaintServerObj {
  priorityId?: number;
  assignedTo?: number;
  statusId?: number;
};

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./complaint.scss')],
  template: require('./complaint.html')
})


export class Dashboard {

  @ViewChild('childModal') childModal: ModalDirective;

  public complaints: Array<Object>;
  public jQuery: any;
  complaintTitle: string;
  complaintId: number;
  againstCategory: string;
  complaintArray: any[];
  employeeList: any[];
  priorityList: any[];
  newComplaintSelected: boolean = false;
  assignedComplaintSelected: boolean = false;
  progressComplaintSelected: boolean = false;
  closedComplaintSelected: boolean = false;
  reopenComplaintSelected: boolean = false;
  paginationMessage: string = "querying..."
  satisfiedComplaintSelected: boolean = false;
  static pageCounter: number = 1;
  showComments: boolean = false;
  showEmployeeNames: boolean = false;
  inProgress: boolean = false;
  allComment: Array<Object>;
  term: any;
  selectedPriority: any;
  serverObj = <edittedComplaintServerObj>{};
  options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };
  dummyVal: string = "8939";
  flag: string = null;
  writtenComment: string;
  commentObj: any;
  noComments: boolean = false;
  showSendComment: boolean = true;
  selectedComplaint: any = { statusId: 11 };
  Comment: any;
  showCloseComplaintForm: boolean = false;
  storeClassForToggleForm: string;
  commentForClosing: string;
  reasonForClosing: string;
  closeComplaintObj: any;

  constructor(private safeHttp: SafeHttp, private configuration: Configuration, private _notificationsService: NotificationsService,private route: ActivatedRoute) { }
  public id:any;
  ngOnInit() {
    this.getAllComplaint();
    this.getAssignedEmployee();
    console.log(this.configuration.getManagementRole());
  }



  showChildModal(obj): void {
    this.complaintTitle = obj.title;
    this.complaintId = obj.id;
    this.againstCategory = obj.againstCategoryName;
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  submitEdittedComplaint = () => {
    this.childModal.hide();
    console.log("Status is", this.inProgress);
    if (this.inProgress) {
      console.log("Inside Progress");
      this.serverObj.statusId = 3;
    }
    console.log("Sending this object", this.serverObj);

    this.safeHttp.put(this.configuration.Server +"/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/" + this.complaintId, this.serverObj).then((res) => {
      this._notificationsService.success(
        this.complaintTitle,
        'Saving Your Changes',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        }
      );
      console.log("this what i got", res.status);
    }).catch((err) => {
      this._notificationsService.error(
        this.complaintTitle,
        'Error in Processing..Try Again!',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        });
    });



  }
  includeEmployee(obj: any) {
    this.term = obj.name;
    this.serverObj.assignedTo = obj.id;
  }

  includePriority(obj: any) {
    console.log("The priority object is ", obj);
    this.serverObj.priorityId = obj.id;
    console.log(obj);
  }

  showComment() {
    this.showComments = true;
  }

  printIt() {
    console.log("git Eddit");
  }
  editComplaint(obj: any) {

    if (obj.statusId == 4 || obj.statusId == 6) {
      this._notificationsService.info(
        'Complaint Cannot Be Edited',
        'Either it is closed or satisfied',
        {
          timeOut: 1000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        }
      );
    }

    else {
      this.inProgress = false;
      this.term = '';

      if (obj.statusId == 3) {
        console.log("it ran");
        this.inProgress = true;
      }
      this.showChildModal(obj);
      console.log(obj);
    }

  }

  onChange(newValue) {
    this.serverObj.priorityId = newValue.id;
  }


  onScroll() {
    console.log('scrolled!!');
    // console.log( ++Dashboard.pageCounter);
    this.getPaginatedAllComplaint(++Dashboard.pageCounter);
  }

  getAllComplaint() {
    console.log("displauojg new compalints ");
    this._notificationsService.info(
      'Getting All Complaints',
      '',
      {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 40
      }
    );
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint").then((data) => {
      console.log("Fetched All Complaints");
      // this.complaints = data;
      this.complaintArray = data;
    })

  }

  getPaginatedAllComplaint(pageNo: number) {
    console.log("displauojg new compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/page/" + pageNo).then((data) => {
      console.log("Fetched All Complaints");

      if (data === null) {
        console.log("hofaya ghar jaao");
        this.paginationMessage = "No more Complaints..";
      }
      else {
        this.paginationMessage = "Getting more complaints.....";
        console.log("ABC", this.complaintArray.push(...data));
        this.complaintArray = this.complaintArray;
      }

    })

  }

  showEmployees() {
    this.showEmployeeNames = true;
  }

  storeId(id: string) {

    console.log("outside ran");
    if (this.dummyVal != id) {
      console.log("inside ran");
      console.log("passing", id);
      console.log("present", this.dummyVal);
      this.dummyVal = id;
      jQuery(this.dummyVal).css('display', 'none');

    }

  }

  closeCommentSection(obj: any) {
    var str = String("#" + obj.id);
    var strr = str.toString();
    jQuery(strr).css('display', 'none');
  }

  getComplaintComment(obj: any) {

    this.selectedComplaint = obj;
    console.log("Selected Complaint ", this.selectedComplaint);
    var str = String("#" + obj.id);
    var strr = str.toString();
    console.log(strr);
    this.storeId(strr);
    this.showSendComment = true;
    if (this.selectedComplaint.statusId == 4 || this.selectedComplaint.statusId == 6) {
      console.log("doing it false");
      this.showSendComment = false;
    }
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/" + obj.id + "/comment").then((data) => {
      console.log("Fetched All Complaint Comment", data);
      this.noComments = false;
      if (data === this.flag) {
        this.allComment = data;
        this.noComments = true;
        Comment = null;
        jQuery(strr).css('display', 'block');
      }
      else {
        this.allComment = data.reverse();
        jQuery(strr).css('display', 'block');
      }
    })
  }

  sendComment(msg: string, obj: any) {
    console.log("Sendin message",msg);
    console.log("Complaint Message",obj);
    this.commentObj = {
      comment: msg
    };

    console.log(this.commentObj);
    this.writtenComment = '';

    this.safeHttp.post(this.configuration.Server +"/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementRole() + "/complaint/" + obj.id + "/comment", this.commentObj).then((data) => {
      this.commentObj = {
        comment: msg,
        createdAt: new Date(),
        parentId: null
      };
      this.allComment.push(this.commentObj);
      console.log("Sent this Comment", data);
    });
  }
  closeForm(obj: any) {
    console.log("this wnt to close", obj);
    var str = String("." + obj.id);
    var strr = str.toString();
    // this.storeClass(strr);
    jQuery(strr).css('display', 'none');
  }

  showCloseComplaint(obj: any) {
    console.log("close compalitn object is ", obj);
    if (obj.statusId == 4 || obj.statusId == 6) {
      this._notificationsService.info(
        'Complaint Already Closed Or Satisfied',
        'You cannot close such compalints.',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        }
      );
      console.log("Complaint already closed or satisfied");
    } else {
      var str = String("." + obj.id);
      var strr = str.toString();
      jQuery(strr).css('display', 'block');
      console.log("indeie closeing conpliant");
    }
    // this.showCloseComplaintForm = true;
  }

  sendCloseComplaint(obj: any, index: number) {
    console.log("Index i got is ", index);
    console.log(this.reasonForClosing, this.commentForClosing);
    this.closeComplaintObj = {
      rca: this.reasonForClosing,
      comment: this.commentForClosing
    }
    this.reasonForClosing = '';
    this.commentForClosing = '';
    this.closeForm(obj);
    this.safeHttp.put(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/" + obj.id + "/close", this.closeComplaintObj).then((data) => {
      this._notificationsService.success(
        obj.title,
        'Closing Complaint',
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        }
      );
      console.log("Fetched All Complaint Comment", data.json());
      this.complaintArray[index] = data.json();
    }).catch(function(err) {
      this._notificationsService.error(
        "Error in Processing, Try Again!",
        err,
        {
          timeOut: 2000,
          showProgressBar: true,
          pauseOnHover: false,
          clickToClose: true,
          maxLength: 40
        });
    });
  }

  getNewComplaint() {
    this.complaintTitle = "akjsdfkljsdfABCD";
    this.newComplaintSelected = true;
    this.assignedComplaintSelected = !this.newComplaintSelected;
    this.progressComplaintSelected = !this.newComplaintSelected;
    this.closedComplaintSelected = !this.newComplaintSelected;
    this.reopenComplaintSelected = !this.newComplaintSelected;
    this.satisfiedComplaintSelected = !this.newComplaintSelected;
    console.log("displauojg new compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/1").then((data) => {
      console.log("Fetched new Complaints");
      // this.complaints = data;
      this.complaintArray = data;
    })
  }

  getAssignedComplaint() {
    this.assignedComplaintSelected = true;
    this.newComplaintSelected = !this.assignedComplaintSelected;
    this.progressComplaintSelected = !this.assignedComplaintSelected;
    this.closedComplaintSelected = !this.assignedComplaintSelected;
    this.reopenComplaintSelected = !this.assignedComplaintSelected;
    this.satisfiedComplaintSelected = !this.assignedComplaintSelected;
    console.log("displauojg new compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server +"/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/2").then((data) => {
      console.log("Fetched Assigned Complaints");
      this.complaints = data;
    })
  }
  getProgressComplaint() {
    this.progressComplaintSelected = true;
    this.newComplaintSelected = !this.progressComplaintSelected;
    this.assignedComplaintSelected = !this.progressComplaintSelected;
    this.closedComplaintSelected = !this.progressComplaintSelected;
    this.reopenComplaintSelected = !this.progressComplaintSelected;
    this.satisfiedComplaintSelected = !this.progressComplaintSelected;
    console.log("displauojg Inprogress compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/3").then((data) => {
      console.log("Fetched Inprogress Complaints");
      this.complaints = data;
    })
  }
  getClosedComplaint() {
    this.closedComplaintSelected = true;
    this.newComplaintSelected = !this.closedComplaintSelected;
    this.progressComplaintSelected = !this.closedComplaintSelected;
    this.assignedComplaintSelected = !this.closedComplaintSelected;
    this.reopenComplaintSelected = !this.closedComplaintSelected;
    this.satisfiedComplaintSelected = !this.closedComplaintSelected;
    console.log("displauojg closed compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/4").then((data) => {
      console.log("Fetched Closed Complaints");
      this.complaints = data;
    })
  }
  getReopenComplaint() {
    this.reopenComplaintSelected = true;
    this.newComplaintSelected = !this.reopenComplaintSelected;
    this.progressComplaintSelected = !this.reopenComplaintSelected;
    this.closedComplaintSelected = !this.reopenComplaintSelected;
    this.assignedComplaintSelected = !this.reopenComplaintSelected;
    this.satisfiedComplaintSelected = !this.reopenComplaintSelected;
    console.log("displauojg Reopen compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/5").then((data) => {
      console.log("Fetched Re-open Complaints");
      this.complaints = data;
    })
  }
  getSatisfiedComplaint() {
    this.satisfiedComplaintSelected = true;
    this.newComplaintSelected = !this.satisfiedComplaintSelected;
    this.progressComplaintSelected = !this.satisfiedComplaintSelected;
    this.closedComplaintSelected = !this.satisfiedComplaintSelected;
    this.reopenComplaintSelected = !this.satisfiedComplaintSelected;
    this.assignedComplaintSelected = !this.satisfiedComplaintSelected;
    console.log("displauojg Satsified compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/status/6").then((data) => {
      console.log("Fetched Satisfied Complaints");
      this.complaints = data;
    })
  }

  getAssignedEmployee() {
    console.log("displauojg new compalints ");
    this.safeHttp.getWithoutHeaders(this.configuration.Server + "/"+ this.configuration.getManagementRole()+"/" + this.configuration.getManagementId() + "/complaint/edit-info").then((data) => {
      this.employeeList = data.employees;
      console.log(data.priorities);
      this.priorityList = data.priorities;
      console.log("full data is ", data);
      console.log("assigned employee are", this.employeeList, this.priorityList);
    })

  }


}
