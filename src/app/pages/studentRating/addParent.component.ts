import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./addParent.scss')],
  template: require('./addParent.html')
})
export class AddParent {

  constructor() {
  }

}
