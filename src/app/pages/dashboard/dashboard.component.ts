import {Component, ViewEncapsulation,ElementRef,Input,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChartService} from '../../services/chart.service';
declare let google;
@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class Dashboard {
  public dataTable:any;
  public complaintByStatus:any;
  public complaintByCategoryAndStatus:any;
  public complaintByProgramAndStandard:any;
  constructor(private router:Router,public c:ChartService) {
    if(!window.localStorage.getItem("access_token")){
        this.router.navigateByUrl(`/login`);
  }
}

ngOnInit() {
     google.charts.load('current', {'packages':['corechart']});     
     this.c.getComplaintByStatus().then(res => {
       this.complaintByStatus = res;       
     });
     this.c.getComplaintByCategoryAndStatus().then(res =>{
       this.complaintByCategoryAndStatus = res;       
     });
     this.c.getProgram().then(res =>{
       this.complaintByProgramAndStandard = res;
     });
     setTimeout(() => { 
       this.chartByStatus(this.router);
       this.chartByCategoryAndStatus(this.router); 
       this.chartByProgramAndStandard();       
      }, 2000);
 }
 onResize(event) {
   this.chartByStatus(this.router);
   this.chartByCategoryAndStatus(this.router);
   this.chartByProgramAndStandard();
 }

 chartByStatus(router) {
   var data = new google.visualization.DataTable();
  //  var res = this.complaintByStatus;
  //  this.c.getComplaintByStatus().then(res => {
     data.addColumn('string','Status');
     data.addColumn('number','Complaints');
     data.addColumn({type: 'number',role: 'scope'});
     data.addRows(this.complaintByStatus.length);
     for (let i = 0; i < this.complaintByStatus.length; i++) {
        data.setCell(i, 0, this.complaintByStatus[i].statusName);
        data.setCell(i, 1, this.complaintByStatus[i].count);
        data.setCell(i, 2, this.complaintByStatus[i].statusId);
      }
       var options = {};
       var chart = new google.visualization.PieChart(document.getElementById('chart_by_status'));
       chart.draw(data, options);
       google.visualization.events.addListener(chart, 'select', selectHandler);
       
       function selectHandler(){
         let selectedRow = chart.getSelection()[0].row;
         let sid = data.getValue(selectedRow,2);
         router.navigate(['/pages/view-complaint/status',sid]); 
       }
  //  });
 }
 
 chartByCategoryAndStatus(router){
   var data = new google.visualization.DataTable();
  //  var res = this.complaintByCategoryAndStatus;
  //  this.c.getComplaintByCategoryAndStatus().then(res =>{
    data.addColumn('string','categoryName');
    data.addColumn({type: 'number',role: 'scope'});
    for(let i = 0; i < this.complaintByCategoryAndStatus[0].statusResults.length; i++)
    {
      data.addColumn('number',this.complaintByCategoryAndStatus[0].statusResults[i].statusName);
      data.addColumn({type: 'number',role: 'scope'});
    }
    data.addRows(this.complaintByCategoryAndStatus.length);   
    var maxVal=this.complaintByCategoryAndStatus[0].totalCount; 
    for(let i = 0; i < this.complaintByCategoryAndStatus.length; i++)
    {   
      data.setCell(i,0,this.complaintByCategoryAndStatus[i].categoryName);
      data.setCell(i,1,this.complaintByCategoryAndStatus[i].categoryId);
      
      for(let j = 0; j < this.complaintByCategoryAndStatus[i].statusResults.length; j++)
      {
        data.setCell(i,parseInt(this.complaintByCategoryAndStatus[i].statusResults[j].statusId)*2, this.complaintByCategoryAndStatus[i].statusResults[j].count);
        data.setCell(i,parseInt(this.complaintByCategoryAndStatus[i].statusResults[j].statusId)*2+1, this.complaintByCategoryAndStatus[i].statusResults[j].statusId);
        
      }
      if(this.complaintByCategoryAndStatus[i].totalCount>maxVal)
							maxVal=this.complaintByCategoryAndStatus[i].totalCount;
    }   
    
    var options = {	isStacked:'true',chartArea: {width:'50%'},}; 
    var chart = new google.visualization.BarChart(document.getElementById('chart_by_category_status'));
    chart.draw(data, options);
    var handler = function(e) {
    var parts = e.targetID.split('#');
    console.log(e, parts);
    if(parts[0]=="vAxis")
    {
      if (parts.indexOf('label') >= 0) {
        var idx = parts[parts.indexOf('label') + 1];
        var categoryId=data.getValue(parseInt(idx),1);
        router.navigate(['/pages/view-complaint/category',categoryId]);    
      }
    }
    else if(parts[0]=="legendentry") 
    {

    }
    else if(parts[0]=="bar")
    {
      var categoryId=data.getValue(parseInt(parts[2]),1);
      var statusId=data.getValue(parseInt(parts[2]),(parseInt(parts[1])+1)*2+1);
      console.log(categoryId,statusId);
      router.navigate(['/pages/view-complaint/category-status',categoryId,statusId]);
    }
  };
  google.visualization.events.addListener(chart, 'click', handler);
  //  });
   
 }
 chartByProgramAndStandard(){
   
   var data = new google.visualization.DataTable();
   console.log("before");
   data.addColumn('string','ProgramName');
   data.addColumn({type: 'number',role: 'scope'});
   for(let i=0; i < this.complaintByProgramAndStandard[0].standardResults.length; i++){
     data.addColumn('number',this.complaintByProgramAndStandard[0].standardResults[i].standardName);
     data.addColumn({type: 'number',role: 'scope'});
   }
   
   data.addRows(this.complaintByProgramAndStandard.length);
   for(let i = 0; i < this.complaintByProgramAndStandard.length; i++){
     data.setCell(i,0,this.complaintByProgramAndStandard[i].programName);
     data.setCell(i,1,this.complaintByProgramAndStandard[i].programId);
     for(let j = 0; j < this.complaintByProgramAndStandard[i].standardResults.length; j++){
        data.setCell(i,parseInt(this.complaintByProgramAndStandard[i].standardResults[j].standardId)*2,this.complaintByProgramAndStandard[i].standardResults[j].count);
        data.setCell(i,parseInt(this.complaintByProgramAndStandard[i].standardResults[j].standardId)*2+1,this.complaintByProgramAndStandard[i].standardResults[j].standardId);
     }
   }  
   var options = {	isStacked:'true',chartArea: {width:'50%'},}; 
   var chart = new google.visualization.BarChart(document.getElementById('chart_by_program_standard'));
   chart.draw(data, options);
 }

}
