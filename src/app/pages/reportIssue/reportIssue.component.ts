import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./reportIssue.scss')],
  template: require('./reportIssue.html')
})
export class Dashboard {

  constructor() {
  }

}
