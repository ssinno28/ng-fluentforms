import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {BaseReusableComponent} from '../../../fluentforms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [
    `ngb-datepicker {
      display: inline-block !important;
    }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent extends BaseReusableComponent {
  displayMonths: number;
}
