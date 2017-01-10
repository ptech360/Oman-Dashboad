import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./poll.scss')],
  template: require('./poll.html')
})
export class Dashboard {

  constructor() {
  }

}
