import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./suggestion.scss')],
  template: require('./suggestion.html')
})
export class Dashboard {

  constructor() {
  }

}
