import {Component, ViewEncapsulation, ElementRef, Input, OnInit} from '@angular/core';
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
  public dataTable: any;
  public complaintByStatus: any;
  public complaintByCategoryAndStatus: any;
  public complaintByProgramAndStandard: any;
  public belowPerformance: any;
  public drilled = false;
  constructor(private router: Router, public c: ChartService) {
    if (!window.localStorage.getItem("access_token")) {
      this.router.navigateByUrl(`/login`);
    }
  }

  ngOnInit() {
    google.charts.load('current', { 'packages': ['corechart', 'table'] });
    this.c.getComplaintByStatus().then(res => {
      this.complaintByStatus = res;
    });
    this.c.getComplaintByCategoryAndStatus().then(res => {
      this.complaintByCategoryAndStatus = res;
    });
    this.c.getComplaintOfProgram().then(res => {
      this.complaintByProgramAndStandard = res;
    });
    this.c.getBelowPerfomanceOfProgram().then(res => {
      this.belowPerformance = res;
    });
    setTimeout(() => {
      this.chartByStatus(this.router);
      this.chartByCategoryAndStatus(this.router);
      this.chartByProgramAndStandard(this.router);
      this.chartByBelowPerformanceOfProgram(this.router);
      this.planChart();
    }, 2000);
  }
  onResize(event) {
    this.chartByStatus(this.router);
    this.chartByCategoryAndStatus(this.router);
    this.chartByProgramAndStandard(this.router);
    this.chartByBelowPerformanceOfProgram(this.router);
    this.planChart();
  }

  chartByStatus(router) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Status');
    data.addColumn('number', 'Complaints');
    data.addColumn({ type: 'number', role: 'scope' });
    data.addRows(this.complaintByStatus.length);
    for (let i = 0; i < this.complaintByStatus.length; i++) {
      data.setCell(i, 0, this.complaintByStatus[i].statusName);
      data.setCell(i, 1, this.complaintByStatus[i].count);
      data.setCell(i, 2, this.complaintByStatus[i].statusId);
    }
    var options = { is3D: true };
    var chart = new google.visualization.PieChart(document.getElementById('chart_by_status'));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler() {
      let selectedRow = chart.getSelection()[0].row;
      let sid = data.getValue(selectedRow, 2);
      router.navigate(['/pages/view-complaint/status', sid]);
    }
  }

  chartByCategoryAndStatus(router) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'categoryName');
    data.addColumn({ type: 'number', role: 'scope' });
    for (let i = 0; i < this.complaintByCategoryAndStatus[0].statusResults.length; i++) {
      data.addColumn('number', this.complaintByCategoryAndStatus[0].statusResults[i].statusName);
      data.addColumn({ type: 'number', role: 'scope' });
    }
    data.addRows(this.complaintByCategoryAndStatus.length);
    var maxVal = this.complaintByCategoryAndStatus[0].totalCount;
    for (let i = 0; i < this.complaintByCategoryAndStatus.length; i++) {
      data.setCell(i, 0, this.complaintByCategoryAndStatus[i].categoryName);
      data.setCell(i, 1, this.complaintByCategoryAndStatus[i].categoryId);

      for (let j = 0; j < this.complaintByCategoryAndStatus[i].statusResults.length; j++) {
        data.setCell(i, parseInt(this.complaintByCategoryAndStatus[i].statusResults[j].statusId) * 2, this.complaintByCategoryAndStatus[i].statusResults[j].count);
        data.setCell(i, parseInt(this.complaintByCategoryAndStatus[i].statusResults[j].statusId) * 2 + 1, this.complaintByCategoryAndStatus[i].statusResults[j].statusId);

      }
      if (this.complaintByCategoryAndStatus[i].totalCount > maxVal)
        maxVal = this.complaintByCategoryAndStatus[i].totalCount;
    }

    var options = { isStacked: 'true', chartArea: {}, };
    var chart = new google.visualization.BarChart(document.getElementById('chart_by_category_status'));
    chart.draw(data, options);
    var handler = function(e) {
      var parts = e.targetID.split('#');
      console.log(e, parts);
      if (parts[0] == "vAxis") {
        if (parts.indexOf('label') >= 0) {
          var idx = parts[parts.indexOf('label') + 1];
          var categoryId = data.getValue(parseInt(idx), 1);
          router.navigate(['/pages/view-complaint/category', categoryId]);
        }
      }
      else if (parts[0] == "legendentry") {

      }
      else if (parts[0] == "bar") {
        var categoryId = data.getValue(parseInt(parts[2]), 1);
        var statusId = data.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
        console.log(categoryId, statusId);
        router.navigate(['/pages/view-complaint/category-status', categoryId, statusId]);
      }
    };
    google.visualization.events.addListener(chart, 'click', handler);
  }
  chartByProgramAndStandard(router) {
    var data = new google.visualization.DataTable();
    console.log("before");
    data.addColumn('string', 'ProgramName');
    data.addColumn({ type: 'number', role: 'scope' });
    for (let i = 0; i < this.complaintByProgramAndStandard[0].standardResults.length; i++) {
      data.addColumn('number', this.complaintByProgramAndStandard[0].standardResults[i].standardName);
      data.addColumn({ type: 'number', role: 'scope' });
    }

    data.addRows(this.complaintByProgramAndStandard.length);
    for (let i = 0; i < this.complaintByProgramAndStandard.length; i++) {
      data.setCell(i, 0, this.complaintByProgramAndStandard[i].programName);
      data.setCell(i, 1, this.complaintByProgramAndStandard[i].programId);
      for (let j = 0; j < this.complaintByProgramAndStandard[i].standardResults.length; j++) {
        data.setCell(i, parseInt(this.complaintByProgramAndStandard[i].standardResults[j].standardId) * 2, this.complaintByProgramAndStandard[i].standardResults[j].count);
        data.setCell(i, parseInt(this.complaintByProgramAndStandard[i].standardResults[j].standardId) * 2 + 1, this.complaintByProgramAndStandard[i].standardResults[j].standardId);
      }
    }
    var options = { isStacked: 'true', chartArea: { width: '50%' }, };
    var chart = new google.visualization.BarChart(document.getElementById('chart_by_program_standard'));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'click', handler);
    function handler(e) {
      var parts = e.targetID.split('#');
      console.log(e, parts);
      if (parts[0] == "vAxis") {
        if (parts.indexOf('label') >= 0) {
          var idx = parts[parts.indexOf('label') + 1];
          var programId = data.getValue(parseInt(idx), 1);
          router.navigate(['/pages/view-complaint/program', programId]);
        }
      }
      else if (parts[0] == "legendentry") {

      }
      else if (parts[0] == "bar") {
        var programId = data.getValue(parseInt(parts[2]), 1);
        var standardId = data.getValue(parseInt(parts[2]), (parseInt(parts[1]) + 1) * 2 + 1);
        console.log(programId, standardId);
        router.navigate(['/pages/view-complaint/program-standard', programId, standardId]);
      }
    }

  }
  chartByBelowPerformanceOfProgram(router) {
    this.drilled = false;
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Program');
    data.addColumn('number', 'Performance');
    data.addColumn({ type: 'number', role: 'scope' });
    data.addRows(this.belowPerformance.length);
    for (let i = 0; i < this.belowPerformance.length; i++) {
      data.setCell(i, 0, this.belowPerformance[i].programName);
      data.setCell(i, 1, this.belowPerformance[i].count);
      data.setCell(i, 2, this.belowPerformance[i].programId);
    }
    var options = { is3D: true };
    var chart = new google.visualization.PieChart(document.getElementById('chart_of_below_permance'));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);
    var that = this;
    function selectHandler() {
      let selectedRow = chart.getSelection()[0].row;
      let pId = data.getValue(selectedRow, 2);
      that.chartByProgramId(pId);
    }
  }
  chartByProgramId(programId) {
    this.drilled = true;
    this.c.getBelowPerfomanceOfProgramById(programId).then(res => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Standard');
      data.addColumn('number', 'Performance');
      data.addColumn({ type: 'number', role: 'scope' });
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].standardName);
        data.setCell(i, 1, res[i].count);
        data.setCell(i, 2, res[i].standardId);
      }
      var options = { is3D: true };
      var chart = new google.visualization.PieChart(document.getElementById('chart_of_below_permance'));
      chart.draw(data, options);
      google.visualization.events.addListener(chart, 'select', selectHandler);
      var that = this;
      function selectHandler() {
        let selectedRow = chart.getSelection()[0].row;
        let standardId = data.getValue(selectedRow, 2);
        that.viewStudentTableByStandard(programId, standardId);
      }
    });
  }
  back() {
    this.chartByBelowPerformanceOfProgram(this.router);
  }
  viewStudentTableByStandard(programId, standardId) {
    this.c.getBelowPerfomanceStudentsByStandard(programId, standardId).then(res => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Student Name');
      data.addColumn('string', 'Subject Name');
      data.addColumn('boolean', 'Have Plan');
      data.addColumn('date', 'Created At');
      data.addRows(res.length);
      for (let i = 0; i < res.length; i++) {
        data.setCell(i, 0, res[i].studentName);
        data.setCell(i, 1, res[i].subjectName);
        data.setCell(i, 2, res[i].isPIP);
        data.setCell(i, 3, new Date(res[i].createdAt));
      }
      var table = new google.visualization.Table(document.getElementById('chart_of_below_permance'));
      table.draw(data, { showRowNumber: true, width: '100%' });
    });

  }
  
  planChart(){
    this.c.getPlansForBelowPerformer().then(res => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'programName');
      data.addColumn('number', 'True');
      data.addColumn('number', 'False');

      data.addRows(res.length);
      var pipCountLength;
      for(let i = 0; i < res.length; i++ ){
        console.log(res[i]);
        data.setCell(i,0,res[i].programName);
        pipCountLength = res[i].pipCount.length;
        if(pipCountLength==1 && res[i].pipCount[0].pip==true){
          data.setCell(i,1,res[i].pipCount[0].count);
          data.setCell(i,2,0);
        }else if(pipCountLength==1 && res[i].pipCount[0].pip==false){
           data.setCell(i,2,res[i].pipCount[0].count);
          data.setCell(i,1,0);
        }else{
           data.setCell(i,1,res[i].pipCount[1].count);
          data.setCell(i,2,res[i].pipCount[0].count);
        }
      }

      var options = {                
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    });
     
  }
}
