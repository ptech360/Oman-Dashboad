import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./appreciation.scss')],
  template: require('./appreciation.html')
})
export class Dashboard {

  constructor() {
  }

}
