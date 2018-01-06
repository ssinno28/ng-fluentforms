import {Editor} from './base.editor';
import {NumberComponent} from '../reusable_components/number/number.component';

export class NumberEditor extends Editor<NumberComponent> {
  component = NumberComponent;
}
