import {Component,ViewEncapsulation,OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router}   from '@angular/router';
import {ChartService} from '../../services/chart.service';
@Component({
  selector: 'view-complaint',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./view-complaint.scss')],
  template: require('./view-complaint.html')
})
export /**
 * ViewComplaint
 */
class Dashboard {
  public complaintArray =[]; 
  public id:any;
  constructor(private router:Router,private route: ActivatedRoute, private c:ChartService) {
    
  }
  ngOnInit(){    
    this.route.params.subscribe(params => {
    this.id = +params['statusId']; // (+) converts string 'id' to a number
      if(params['statusId']&&params['categoryId']) 
        this.c.getComplaintByCategoryAndStatusId(params['categoryId'],params['statusId']).then(res =>{
          this.complaintArray = res;
        });
      else if(params['statusId'])
        this.c.getComplaintByStatusId(params['statusId']).then(res =>{
          this.complaintArray = res;
        });
      else if(params['categoryId'])
        this.c.getComplaintByCategoryId(params['categoryId']).then(res =>{
          this.complaintArray = res;
        });
      if(params['standardId']&&params['programId']) 
        this.c.getComplaintOfProgramByProgramAndStandardId(params['programId'],params['standardId']).then(res =>{
          this.complaintArray = res;
        });
      else if(params['standardId'])
        this.c.getComplaintByStatusId(params['standardId']).then(res =>{
          this.complaintArray = res;
        });
      else if(params['programId'])
        this.c.getComplaintOfProgramByProgramId(params['programId']).then(res =>{
          this.complaintArray = res;
        });
    });
    
  }
}