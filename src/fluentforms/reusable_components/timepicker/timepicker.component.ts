import {Component} from '@angular/core';
import {BaseReusableComponent} from '../basereusable/basereusable.component';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimePickerComponent extends BaseReusableComponent {
  time;
  hourStep = 1;
  meridian = false;
  minuteStep = 1;
  readonlyInputs = false;
  seconds = false;
  secondStep = 1;
  size = 'medium';
  spinners = true;
}
