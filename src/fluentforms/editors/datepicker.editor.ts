import {Editor} from './base.editor';
import {DatePickerComponent} from '../reusable_components/datepicker/datepicker.component';

export class DatePickerEditor extends Editor<DatePickerComponent> {
  component = DatePickerComponent;
}
